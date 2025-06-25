import React from 'react';
import styles from './Hero.module.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={`${styles.hero} ${styles.container}`}>
      <div className={styles['hero-text']}>
        <h1>Somos o melhor lugar pra você negociar seu carro rápido.</h1>
        <p>Comece a negociar agora para milhares de pessoas!</p>
        <button className={styles.btn} onClick={handleLoginClick}>
          Quero negociar um veículo!
        </button>
      </div>
    </div>
  );
};

export default Hero;
