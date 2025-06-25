import React from 'react';
import styles from './Contato.module.css';

const Contato = () => {
  const [result, setResult] = React.useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('Enviando...');
    const formData = new FormData(event.target);

    formData.append('access_key', '3d6ebd9a-f2de-438a-9933-1f02cad5f137');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult('Mensagem enviada com sucesso');
      event.target.reset();
    } else {
      console.log('Error', data);
      setResult(data.message);
    }
  };

  return (
    <div className={styles.contato}>
      <div className={styles['contato-col']}>
        <h3>Entre em contato!</h3>
        <ul>
          <li>MauroMotors@gmail.com</li>
          <li>31 9975-5678</li>
          <li>Av. Raja Gabáglia, 4343 - Santa Lúcia, Belo Horizonte - MG, 30350-577</li>
        </ul>
      </div>
      <div className={styles['contato-col']}>
        <form onSubmit={onSubmit}>
          <label></label>
          <input type="text" name="nome" placeholder="Escreva seu nome" required />
          <label></label>
          <input type="tel" name="telefone" placeholder="Escreva seu número" required />
          <label></label>
          <textarea name="mensagem" rows="6" placeholder="Digite sua mensagem aqui!" required></textarea>
          <button type="submit" className={`${styles.btn} ${styles['dark-btn']}`}>
            Enviar
          </button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contato;
