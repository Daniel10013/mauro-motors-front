// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './Vantagens.module.css';
import { ThumbsUp, ShieldCheck, ChartNoAxesCombined } from 'lucide-react';

const Vantagens = () => {
  return (
    <div className={styles.vantagens}>
      <div className={styles.vantagem}>
        <ThumbsUp size={158} color='green' />
        <h1>Vários usuários satisfeitos</h1>
        <div className={styles.caption}>
          <p>
            Mais de 20 mil clientes ao longo dos nossos anos de história foram atendidos. E cerca de 96% disseram que estavam satisfeitos com o serviço!
          </p>
        </div>
      </div>

      <div className={styles.vantagem}>
        <ChartNoAxesCombined size={158} color='green' />
        <h1>Alta taxa de venda rápida</h1>
        <div className={styles.caption}>
          <p>
            Mais de 80% dos nossos anúncios de veículos encontram compradores na mesma semana em que são publicados!
          </p>
        </div>
      </div>

      <div className={styles.vantagem}>
        <ShieldCheck size={158} color='green' />
        <h1>Site seguro</h1>
        <div className={styles.caption}>
          <p>
            Nossos sistemas contam com tecnologias e criptografias avançadas de ponta a ponta para garantir a segurança dos seus dados!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vantagens;
