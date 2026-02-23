import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Contact.module.css'; 

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío (conecta a tu backend después)
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={styles.contactContainer}>
      <h1>Contáctanos</h1>
      <p>¿Tienes preguntas o deseas una joya personalizada? Escríbenos.</p>
      {submitted ? (
        <p className={styles.success}>¡Mensaje enviado! Te responderemos pronto.</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <input
            type="text"
            name="name"
            placeholder="Tu Nombre"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Tu Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <textarea
            name="message"
            placeholder="Tu Mensaje"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
          ></textarea>
          <button type="submit" className={styles.ctaButton}>Enviar</button>
        </form>
      )}
      <Link to="/" className={styles.backLink}>Volver a Inicio</Link>
    </div>
  );
};

export default Contact;