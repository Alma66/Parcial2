import React from 'react';
import { useAuth } from '../context/AuthContext'; 
import AdminPanel from '../components/AdminPanel'; // Componente de panel de administración
import styles from '../css/Home.module.css'; 

// Imágenes importadas
import banner1 from '../assets/images/banner/banner1.jpeg';
import banner2 from '../assets/images/banner/banner2.jpeg';
import banner3 from '../assets/images/banner/banner3.jpeg';

const Home = () => {
  // Obtener  usuario actual desde el contexto
  const { user } = useAuth(); 

  return (
    <div className={styles.homeContainer}>
      {/* Banner principal */}
      <div className={styles.mainBanner}>
        <img src={banner1} alt="Banner principal de Ébano & Bronce" className={styles.bannerImage} />
        <div className={styles.bannerText}>
          <h1>Ébano & Bronce</h1>
        </div>
      </div>

      {/* Tres columnas de texto */}
      <div className={styles.columns}>
        <div className={styles.column}>
          <h2>Estilo y Elegancia</h2>
          <p>
          La joyería es una expresión de nuestra esencia, y cada pieza que creamos está pensada para reflejar el lujo, la sofisticación y el estilo atemporal que define nuestra marca. En Ebano&Bronce, entendemos que la elegancia no es simplemente un adorno, sino una extensión de la personalidad, un detalle que habla de la confianza y el buen gusto. Cada joya está meticulosamente diseñada para complementar no solo la belleza de quien la lleva, sino también la de la ocasión. Inspirados por las culturas y tradiciones más exquisitas, buscamos fusionar lo clásico con lo moderno, creando colecciones que trascienden generaciones. Ya sea un delicado anillo, un colgante enigmático o unos aretes refinados, nuestra joyería es un testamento a la elegancia que nunca pasa de moda, y que siempre resalta en cada momento especial.
          </p>
        </div>
        <div className={styles.column}>
          <h2>Diseño Multicultural</h2>
          <p>
          La riqueza de las culturas del mundo se entrelaza en cada una de nuestras piezas, brindando a Ebano&Bronce una identidad única y diversa. Nuestros diseños están profundamente inspirados en las tradiciones de múltiples países, desde la elegancia de la joyería francesa hasta los vibrantes matices de la India, sin olvidar la delicadeza de la joyería alemana y el espíritu audaz de Argentina. Cada pieza es un homenaje a la fusión de costumbres, creencias y estilos, creando joyas que cuentan una historia de unidad, respeto y admiración por la diversidad. Nos enorgullece combinar técnicas ancestrales con enfoques contemporáneos, asegurando que cada joya sea tanto una obra de arte como una pieza funcional, adaptada a los gustos y estilos de vida más modernos. Nuestro diseño multicultural no solo embellece, sino que conecta a las personas con la historia, la tradición y el futuro de una manera que solo la joyería puede lograr.
          </p>
        </div>
        <div className={styles.column}>
          <h2>Materiales de Alta Calidad</h2>
          <p>
          La calidad es el pilar fundamental en Ebano&Bronce, y nos aseguramos de que cada joya que diseñamos sea una verdadera obra maestra. Trabajamos con los materiales más selectos, desde el oro más puro hasta piedras preciosas de la más alta calidad, garantizando no solo la belleza visual, sino también la durabilidad y el valor de nuestras piezas. Nuestros metales son cuidadosamente elegidos por su resistencia y su capacidad para mantener su brillo y esplendor con el paso del tiempo. Las gemas que seleccionamos provienen de fuentes responsables, cada una de ellas con su propio carácter y singularidad. Estas piedras, ya sean rubíes, zafiros, esmeraldas o diamantes, son cortadas con precisión para maximizar su resplandor y resaltar la majestuosidad de cada diseño. En Ebano&Bronce, creemos que la verdadera calidad se refleja en cada detalle, desde el primer boceto hasta la última piedra colocada, asegurando que nuestras joyas no solo sean un placer visual, sino también un legado que perdurará por generaciones.
          </p>
        </div>
      </div>

      {/* Banner secundario */}
      <div className={styles.secondaryBanner}>
        <img src={banner2} alt="Banner secundario" className={styles.bannerImage} />
      </div>

      {/* Mostrar el panel de administración = si el usuario  es Administrador */}
      {user?.role === 'Administrador' ? (
        <AdminPanel />
      ) : (
        <p className={styles.accessDenied}>No tienes permisos para acceder a esta sección.</p>
      )}

      {/* Banner terciario */}
      <div className={styles.tertiaryBanner}>
        <img src={banner3} alt="Banner terciario" className={styles.bannerImage} />
      </div>
    </div>
  );
};

export default Home;
