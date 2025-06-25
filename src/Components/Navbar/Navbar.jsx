import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logonav.png';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 500 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll); // boa prática: limpar listener
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className={`${styles.container} ${sticky ? styles['dark-nav'] : ''}`}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <ul>
        <button className={styles.btn} onClick={handleLoginClick}>
          Login
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
