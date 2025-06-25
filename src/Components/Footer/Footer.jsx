import React from 'react'
import styles from './Footer.module.css'
import logo from '../../assets/logo.png'


const Footer = () => {

  const data = new Date().getFullYear();

  return (
    <div className={styles.footer}>
        <img src={logo} alt="" style={{width: "80px"}} />
        <p>Copyright {data} © Mauro Motors</p>  
        <div> </div>             
    </div>
  )
}

export default Footer