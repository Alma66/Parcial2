// Usar las funcionalidades de React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importar el componente principal 'App' (tiene el contenido de la app)
import App from './App'; 

// Buscar en el HTML elememnto con id 'root' para mostrar la app
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(<App />);

