// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';

// URL base del API (configurar en .env con REACT_APP_API_URL)
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Crear axios instance para usar en la app
const createApiInstance = (accessToken) => {
  const instance = axios.create({
    baseURL: API_BASE,
    withCredentials: true // importante para cookies httpOnly (refresh)
  });

  if (accessToken) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }

  return instance;
};

// Helper para decodificar payload de JWT
const decodeJWT = (token) => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (e) {
    return null;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); // { username, role, ... }
  const apiRef = useRef(createApiInstance(null));
  const isRefreshingRef = useRef(false);
  const failedQueueRef = useRef([]);
  const interceptorIdRef = useRef(null);

  const processQueue = (error, token = null) => {
    failedQueueRef.current.forEach((prom) => {
      if (error) prom.reject(error);
      else prom.resolve(token);
    });
    failedQueueRef.current = [];
  };

  const updateApiInstance = (token) => {
    apiRef.current = createApiInstance(token);
    attachResponseInterceptor();
  };

  // refresh token: backend valida cookie httpOnly y devuelve { accessToken }
  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/refresh`,
        {},
        { withCredentials: true }
      );
      const newAccessToken = res.data?.accessToken;
      if (!newAccessToken) throw new Error('No new access token');

      setAccessToken(newAccessToken);
      const payload = decodeJWT(newAccessToken);
      if (payload) {
        setUser({
          username: payload.username || payload.email || null,
          role: payload.role || payload.roles || null,
          ...payload
        });
      }
      updateApiInstance(newAccessToken);
      return newAccessToken;
    } catch (err) {
      // Si falla el refresh, limpiamos estado (user no está autenticado)
      setAccessToken(null);
      setUser(null);
      updateApiInstance(null);
      throw err;
    }
  };

  const attachResponseInterceptor = () => {
    // Eject previous interceptor safely
    try {
      if (interceptorIdRef.current !== null && apiRef.current.interceptors?.response) {
        apiRef.current.interceptors.response.eject(interceptorIdRef.current);
        interceptorIdRef.current = null;
      }
    } catch (e) {
      // ignore
    }

    interceptorIdRef.current = apiRef.current.interceptors.response.use(
      (response) => response,
      (error) => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        const status = error.response?.status;

        if (
          status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes('/api/auth/refresh') &&
          !originalRequest.url?.includes('/api/auth/login')
        ) {
          if (isRefreshingRef.current) {
            return new Promise(function (resolve, reject) {
              failedQueueRef.current.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return apiRef.current(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshingRef.current = true;

          return new Promise((resolve, reject) => {
            refreshAccessToken()
              .then((newToken) => {
                originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
                processQueue(null, newToken);
                resolve(apiRef.current(originalRequest));
              })
              .catch((err) => {
                processQueue(err, null);
                reject(err);
              })
              .finally(() => {
                isRefreshingRef.current = false;
              });
          });
        }

        return Promise.reject(error);
      }
    );
  };

  useEffect(() => {
    updateApiInstance(accessToken);

    let mounted = true;
    (async () => {
      try {
        // Intentar refresh al montar (si existe refresh cookie)
        await refreshAccessToken();
      } catch (e) {
        // no logueado, está ok
        if (!mounted) return;
      }
    })();

    return () => {
      mounted = false;
      // eject interceptor al desmontar
      try {
        if (apiRef.current && interceptorIdRef.current !== null) {
          apiRef.current.interceptors.response.eject(interceptorIdRef.current);
        }
      } catch (e) {}
    };
    // eslint-disable-next-line
  }, []);

  // login: devuelve { ok, user, accessToken } para uso inmediato en componentes
  const login = async (username, password) => {
    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/login`,
        { username, password },
        { withCredentials: true }
      );

      const token = res.data?.accessToken;
      if (!token) throw new Error('No access token returned');

      setAccessToken(token);
      const payload = decodeJWT(token);
      const userPayload = payload
        ? {
            username: payload.username || payload.email || null,
            role: payload.role || payload.roles || null,
            ...payload
          }
        : null;

      if (userPayload) setUser(userPayload);
      updateApiInstance(token);

      return { ok: true, user: userPayload, accessToken: token };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Error en login';
      return { ok: false, message };
    }
  };

  // register: devuelve lo que venga del backend; si viene accessToken, devuelve user también
  const register = async (payload) => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, payload, {
        withCredentials: true
      });

      const token = res.data?.accessToken;
      if (token) {
        setAccessToken(token);
        const p = decodeJWT(token);
        const userPayload = p
          ? {
              username: p.username || p.email || null,
              role: p.role || p.roles || null,
              ...p
            }
          : null;
        if (userPayload) setUser(userPayload);
        updateApiInstance(token);
        return { ok: true, data: res.data, user: userPayload };
      }

      return { ok: true, data: res.data };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Error en registro';
      return { ok: false, message };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE}/api/auth/logout`, {}, { withCredentials: true });
    } catch (e) {
      // Ignorar
    } finally {
      setAccessToken(null);
      setUser(null);
      updateApiInstance(null);
    }
  };

  const hasRole = (roleName) => {
    if (!user) return false;
    const r = user.role;
    if (!r) return false;
    if (Array.isArray(r)) return r.map((x) => String(x).toLowerCase()).includes(String(roleName).toLowerCase());
    return String(r).toLowerCase() === String(roleName).toLowerCase();
  };

  // getter para la instancia axios actual (siempre actualizada)
  const getAuthAxios = () => apiRef.current;

  const isAuthenticated = !!accessToken && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        login,
        logout,
        register,
        refreshAccessToken,
        hasRole,
        getAuthAxios // usar getAuthAxios().get(...) en vez de authAxios
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
