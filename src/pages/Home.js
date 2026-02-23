import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Para el botón de contacto
import styles from '../css/Home.module.css';

// Imágenes importadas (banner1 intacto)
import banner1 from '../assets/images/banner/banner1.jpeg';
import banner2 from '../assets/images/banner/banner2.jpeg';
import banner3 from '../assets/images/banner/banner3.jpeg';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const autoplayRef = useRef(null);

  // Fetch de productos destacados
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeaturedProducts();
  }, []);

  // Lógica del carrusel
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(featuredProducts.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(featuredProducts.length / 3)) % Math.ceil(featuredProducts.length / 3));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(nextSlide, 4000);
    return () => clearInterval(autoplayRef.current);
  }, [featuredProducts]);

  const handleMouseEnter = () => clearInterval(autoplayRef.current);
  const handleMouseLeave = () => {
    autoplayRef.current = setInterval(nextSlide, 4000);
  };

  const totalSlides = Math.ceil(featuredProducts.length / 3);

  return (
    <div className={styles.homeContainer}>
      {/* Banner principal - INTACTO */}
      <div className={styles.mainBanner}>
        <img src={banner1} alt="Banner principal de Ébano & Bronce" className={styles.bannerImage} />
        <div className={styles.bannerText}>
          <h1>Ébano & Bronce</h1>
        </div>
      </div>

      {/* Carrusel - AJUSTADO */}
      <div className={styles.carouselSection}>
        <h2 className={styles.sectionTitle}>Piezas Destacadas</h2>
        <div
          className={styles.carousel}
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {featuredProducts.map((product, index) => (
              <div key={product.id} className={styles.carouselItem}>
                <img src={product.imageUrl} alt={product.name} className={styles.carouselImage} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <button className={styles.ctaButton}>Descubrir</button>
              </div>
            ))}
          </div>
          <button className={styles.prevButton} onClick={prevSlide}>‹</button>
          <button className={styles.nextButton} onClick={nextSlide}>›</button>
        </div>
        {/* Línea amarilla debajo - Indicadores clicables */}
        <div className={styles.carouselIndicator}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`${styles.indicatorDot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Nueva sección: La Historia de Ébano & Bronce */}
      <div className={styles.historySection}>
        <h2>La Historia de Ébano & Bronce</h2>
        <p>Inspirada en las raíces multiculturales de sus fundadores, Ébano & Bronce nace de la fusión de tradiciones francesas de refinamiento, la vibrante espiritualidad india, la precisión alemana y el apasionado espíritu argentino. Desde nuestros talleres en el corazón de Europa, creamos joyas que narran historias de amor, fe y elegancia. Cada colección es un viaje: el ébano simboliza la fuerza serena de la naturaleza, mientras que el bronce evoca la calidez del sol mediterráneo. Nuestros diseños no solo adornan, sino que conectan generaciones, celebrando la diversidad como el mayor tesoro. Únete a esta saga de lujo atemporal.</p>
        <p>Desde 2010, hemos honrado las enseñanzas judías de la perseverancia y las filosofías hindúes de la armonía, creando piezas que trascienden lo material. Nuestros artesanos, herederos de técnicas ancestrales, infunden cada joya con intención: un anillo que representa la eternidad, un collar que evoca la libertad. En Ébano & Bronce, no vendemos joyas; regalamos legados.</p>
      </div>

      {/* Tres columnas expandidas */}
      <div className={styles.columns}>
        <div className={styles.column}>
          <div className={styles.icon}>💎</div>
          <h2>Estilo y Elegancia</h2>
          <p>"La elegancia es el único lujo que nunca pasa de moda." – Coco Chanel</p>
          <p>En Ébano & Bronce, cada pieza refleja lujo atemporal, fusionando culturas para resaltar tu esencia única. Nuestros diseños capturan la sofisticación francesa, con líneas limpias y detalles intrincados, mientras incorporan toques hindúes de simbolismo espiritual. Imagina un collar que no solo embellece, sino que cuenta tu historia personal, adaptándose a bodas, galas o momentos cotidianos de reflexión.</p>
          <p>La elegancia aquí es inclusiva: desde piezas minimalistas para el día a día hasta creaciones audaces para ocasiones especiales. Cada joya es una extensión de ti, diseñada para durar generaciones.</p>
        </div>
        <div className={styles.column}>
          <div className={styles.icon}>🌍</div>
          <h2>Diseño Multicultural</h2>
          <p>"La diversidad es la belleza del mundo." – Inspiración hindú</p>
          <p>Inspirados en Francia, India, Alemania y Argentina, creamos joyas que conectan tradiciones con modernidad. Nuestros anillos combinan la precisión germana con motivos florales indios, mientras que los pendientes evocan la pasión latina. Esta fusión no es casual: es un homenaje a la humanidad, donde cada cultura aporta su magia – el refinamiento europeo, la espiritualidad oriental, la innovación americana.</p>
          <p>Descubre colecciones como "Ébano Essence" (inspirada en bosques sagrados) o "Bronce Heritage" (un guiño a metales ancestrales). Cada diseño es una conversación entre mundos, perfecta para quienes valoran la riqueza cultural.</p>
        </div>
        <div className={styles.column}>
          <div className={styles.icon}>✨</div>
          <h2>Materiales de Alta Calidad</h2>
          <p>"La calidad perdura más que el precio." – Sabiduría judía</p>
          <p>Oro puro, gemas preciosas y técnicas ancestrales garantizan durabilidad y esplendor eterno. Seleccionamos diamantes de talla perfecta, rubíes que brillan como el fuego hindú, y zafiros que recuerdan los cielos franceses. Nuestros metales son forjados con cuidado, resistiendo el tiempo sin perder lustre.</p>
          <p>Cada piedra es certificada, proveniente de fuentes éticas, asegurando que tu joya no solo sea hermosa, sino responsable. Desde el primer boceto hasta el pulido final, priorizamos la excelencia, creando piezas que se convierten en reliquias familiares.</p>
        </div>
      </div>

      {/* Banner secundario */}
      <div className={styles.secondaryBanner}>
        <img src={banner2} alt="Banner secundario" className={styles.bannerImage} />
      </div>

      {/* Nueva sección: Testimonios */}
      <div className={styles.testimonialsSection}>
        <h2>Voces de Nuestros Clientes</h2>
        <div className={styles.testimonials}>
          <div className={styles.testimonial}>
            <p>"Ébano & Bronce transformó mi boda con un anillo que fusiona mi herencia india y francesa. ¡Pura magia!" – Sofia, París</p>
          </div>
          <div className={styles.testimonial}>
            <p>"La calidad es incomparable; mis aretes hindúes inspirados duran años. Recomiendo esta elegancia multicultural." – David, Berlín</p>
          </div>
          <div className={styles.testimonial}>
            <p>"Cada pieza cuenta una historia. Mi collar judío-argentino es mi tesoro diario." – Maria, Buenos Aires</p>
          </div>
        </div>
      </div>

      {/* Banner terciario */}
      <div className={styles.tertiaryBanner}>
        <img src={banner3} alt="Banner terciario" className={styles.bannerImage} />
      </div>

      {/* Footer Teaser */}
      <div className={styles.footerTeaser}>
        <h2>Descubre Más</h2>
        <p>Explora nuestras colecciones exclusivas y únete a la comunidad de Ébano & Bronce. Contacta con nosotros para personalizaciones únicas.</p>
        <Link to="/contact" className={styles.ctaButton}>Contáctanos</Link>
      </div>
    </div>
  );
};

export default Home;