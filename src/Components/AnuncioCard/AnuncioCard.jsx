import React from "react";
import styles from "./AnuncioCard.module.css";

const AnuncioCard = ({ id, nome, descricao, preco, imagem, removerItem, tipo }) => {
  return (
    <div className={styles["card-item"]}>
      <img src={imagem} alt={nome} />
      <h3>{nome}</h3>
      <p>{descricao}</p>
      <p className={styles.preco}>R$ {preco}</p>

      {/* Renderiza diferentes botões ou conteúdos dependendo do tipo */}
      {tipo === "desejo" && (
        <button className={styles.coracao} onClick={() => removerItem(id)}>
          ❤️
        </button>
      )}
      {tipo === "anuncio" && (
        <button className={styles["botao-anuncio"]}>
          Ver Detalhes
        </button>
      )}
    </div>
  );
};

export default AnuncioCard;
