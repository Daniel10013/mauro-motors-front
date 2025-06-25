import { formatDate, formatMoney } from "../../Utils/Utilsformat";
import dateImage from './images/calendario.png';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';
import { Calendar, Gauge } from "lucide-react";

function Card({ id, image, name, price, km, date }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/anuncio/${id}`);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <img src={image} alt={name} className={styles.cardImg}/>
            <div className={styles.info}>
                <div>
                    <p className={styles.name}>{name}</p>
                    <h1 className={styles.price}>{formatMoney(price)}</h1>
                    <div className={styles.km}>
                        <Gauge size={22}/>
                        <p>{km}Km</p>
                    </div>
                </div>
                <div className={styles.info2}>
                    <Calendar size={22}/>
                    <p>{formatDate(date)}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;