// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import styles from './Carrosel.module.css';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  const visibleCount = 5; // Quantidade de imagens visíveis

  const handleNext = () => {
    // Avança o índice até o limite das imagens disponíveis
    if (currentIndex + visibleCount < images.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    // Retrocede o índice, mas não abaixo de zero
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    axios.get(apiUrl + "brands")
      .then((res) => {
        setImages(res.data.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar imagens:", err);
      });
  }, []);

  return (
    <div className={styles.carousel}>
      <button
        className={`${styles.arrow} ${styles.left}`}
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        &#8249;
      </button>
      <div className={styles.carouselTrackWrapper}>
        <div
          className={styles.carouselTrack}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={"https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/refs/heads/master/logos/original/" + image.logo_img}
              alt={image.name}
              className={styles.carouselImage}
            />
          ))}
        </div>
      </div>
      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={handleNext}
        disabled={currentIndex + visibleCount >= images.length}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;