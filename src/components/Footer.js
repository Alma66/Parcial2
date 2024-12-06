import React from 'react';
import styles from '../css/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h2>Ebano & Bronce</h2>
      <p>Joyas que narran historias de elegancia y herencia multicultural.</p>

      <div className={styles.socialLinks}>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">FB</a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">TW</a>
      </div>

      <p className={styles.credits}>© 2024 Ebano & Bronce. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
