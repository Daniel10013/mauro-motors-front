import { use } from "react";
import styles from "./HeaderUniversal.module.css";
import { useNavigate } from "react-router-dom";

function HeaderUniversal() {
  const navigate = useNavigate();
  return (
    <header>
      <div className={styles.left}>
        <h1 className={styles.h1}>Mauro Motors</h1>
      </div>
      <div className={styles.Links}>
        <a className={styles.first} href="/HomeLogin">
          Home
        </a>
        <a href="/Veiculos">Veículos</a>
        <a href="/AnunciarVeiculo">Anunciar</a>
        <a href="/Avaliacao">Avaliações</a>
      </div>
      <div className={styles.space}>
        <div className={styles.icon} onClick={() => navigate("/Perfil")}>
          <img src="/icon.png" alt="" />
        </div>
      </div>
    </header>
  );
}

export default HeaderUniversal;
