import { useState } from 'react';
import PropTypes from 'prop-types';

const Carrossel = ({ imagens }) => {
  const [indexAtual, setIndexAtual] = useState(0);

  const imagemAnterior = () => {
    setIndexAtual((prevIndex) =>
      prevIndex === 0 ? imagens.length - 1 : prevIndex - 1
    );
  };

  const proximaImagem = () => {
    setIndexAtual((prevIndex) =>
      prevIndex === imagens.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={styles.container}>
      <button onClick={imagemAnterior} style={styles.botao}>←</button>

      <img
        src={imagens[indexAtual]}
        alt={`Imagem ${indexAtual + 1}`}
        style={styles.imagem}
      />

      <button onClick={proximaImagem} style={styles.botao}>→</button>
    </div>
  );
};

Carrossel.propTypes = {
  imagens: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Estilo inline simples
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    width: '100%',
    margin: 'auto',
  },
  imagem: {
    width: '100%',
    height: '75vh',
    borderRadius: '8px',
  },
  botao: {
    fontSize: '2rem',
    cursor: 'pointer',
    background: 'rgba(0, 0, 0, 0.859)',
    borderRadius: '25px',
    border: 'none',
    paddingBottom: '4px',
    padding: '5px 15px 10px 15px',
    color: 'white',
  },
};

export default Carrossel;