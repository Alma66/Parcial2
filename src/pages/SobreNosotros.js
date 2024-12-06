import React from 'react';
import styles from '../css/SobreNosotros.module.css';
import ebano from '../assets/images/aboutus/ebano.jpeg';
import hermana1 from '../assets/images/aboutus/hermana1.jpeg';
import hermana3 from '../assets/images/aboutus/hermana3.jpg';
import hermanos2 from '../assets/images/aboutus/hermanos2.jpg';
import pjoven3 from '../assets/images/aboutus/pjoven3.png';

//Componente = la historia de la marca
const SobreNosotros = () => {
  return (
    <div className={styles.container}>  {/* Contenedor principal con estilos */}
      <h1 className={styles.title}>Sobre Nosotros</h1>

      <div className={styles.section}>
        <div className={styles.textBlock}>
          <p>
            En <strong>Ebano & Bronce</strong>, cada joya cuenta una historia de resiliencia, amor y herencia multicultural.
            Nuestra marca nace del encuentro entre dos mundos: el de una mujer india-hindú y un hombre franco-judío, quienes
            se enamoraron en 1928 a pesar de las adversidades que les imponía la sociedad de su tiempo. Un amor que
            trascendió religiones, clases sociales y barreras familiares, que culminó en un matrimonio multirreligioso
            en 1930 y en la fundación de una familia unida por el respeto hacia las diferencias y el deseo de construir
            un futuro común.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <img src={pjoven3} alt="Historia de Ebano & Bronce" className={styles.image} />
        </div>
      </div>

      <div className={styles.sectionReverse}>
        <div className={styles.textBlock}>
          <p>
          La historia de <strong>Ebano & Bronce</strong>  comienza a forjarse con la hija de esta pareja,
             quien, tras enfrentar los horrores de la Segunda Guerra Mundial, la pérdida de su madre y la difícil
             transición de refugiada en Argentina, decide rendir homenaje a su madre, una mujer que adoraba las joyas.
             En 1959, con el apoyo de su padre, lanza la marca que hoy conocemos, combinando la exquisita elegancia de
              las tradiciones francesas e indias en un diseño único.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <img src={hermana1} alt="Pareja fundadora" className={styles.image} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.textBlock}>
          <p>
          A lo largo de los años, nuestra joyería ha crecido, evolucionado y, sobre todo, mantenido su esencia. En 1961, 
          <strong>Ebano & Bronce</strong> se consolida como una marca de alta joyería, enfocada en la calidad, el detalle
          y la sofisticación. Nuestro legado sigue vivo en cada pieza que diseñamos, una pieza que no solo embellece,
          sino que también narra la historia de una familia que superó la adversidad y construyó una nueva vida a través
          del arte de la joyería.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <img src={ebano} alt="Consolidación de la marca" className={styles.image} />
        </div>
      </div>

      <div className={styles.sectionReverse}>
        <div className={styles.textBlock}>
          <p>
            Hoy, <strong>Ebano & Bronce</strong> es un referente mundial en alta joyería, una marca de lujo que honra
            nuestras raíces y el compromiso con la excelencia. Desde la visión de una hija que llevó adelante el legado
            de su madre, hasta el apoyo continuo de la familia, nuestra joyería continúa siendo un símbolo de la fuerza,
            la unión y la belleza que perdura a lo largo del tiempo.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <img src={hermanos2} alt="Legado familiar" className={styles.image} />
        </div>
      </div>

      <div className={styles.lastSection}>
        <div className={styles.textBlock}>
          <p>
          Gracias por formar parte de nuestra historia. Cada joya que crea <strong>Ebano & Bronce</strong> es 
          una extensión de nuestra familia y de nuestro legado. Una joya que no solo es un símbolo de belleza, 
          sino de todo lo que hemos vivido y aprendido a lo largo de generaciones.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <img src={hermana3} alt="Unión familiar" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
