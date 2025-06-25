import styles from '../../Pages/Home_ComLogin/Home_ComLogin.module.css'
import './quizzCards.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

export default function QuizzCards({ isHome }) {
    const navigate = useNavigate();

    const dictionaries = {
        engine_displacement: {
            '1.0L': '1.0 L',
            '1.0L - 2.0L': '1.0 L – 2.0 L',
            '2.0L and above': 'Acima de 2.0 L',
        },
        engine_type: {
            gasoline: 'Gasolina',
            diesel: 'Diesel',
            electric: 'Elétrico',
            hybrid: 'Híbrido',
        },
        car_size: {
            hatch: 'Hatch',
            coupe: 'Cupê',
            suv: 'SUV',
            offroad: 'Off‑road',
            sedan: 'Sedã',
        },
        price_range: {
            'up to 50k': 'Até 50 mil',
            '50k to 100k': '50 mil – 100 mil',
            '100k to 150k': '100 mil – 150 mil',
            '150k and above': 'Acima de 150 mil',
        },
    };

    const [quizzCards, setQuizzCards] = useState([])

    useEffect(() => {
        setQuizz();
    }, []);

    const setQuizz = () => {
        axios.get(apiUrl + "quizz", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.data.status == "success") {
                const quizzData = res.data.data;
                if (isHome) {
                    setQuizzCards(quizzData.slice(0, 5));
                } else {
                    setQuizzCards(quizzData);
                }
                console.log(quizzCards)
            }
        });
    }

    return (
        <div className={styles.quizzCards} style={{width: "100%"}}>
            {quizzCards.length === 0 ? (
                <p className={styles.quizzNoResults}>
                    Que pena! Parece que nosso sistema não encontrou nada que combine com seu gosto T-T
                    <br />
                    <br />
                    Que tal tentar outro tipo de carro no nosso quizz? :D
                </p>
            ) : (
                quizzCards.map((data, key) => {
                    return (
                        <div key={key} className={styles.cardQuizz}>
                            <h1>{data.brand} {data.name}</h1>

                            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <span className={styles.quizzAttribute}>Cilindradas do motor:</span>
                                <span className={styles.quizzValue}>{dictionaries.engine_displacement[data.engine_displacement] ?? data.engine_displacement}</span>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <span className={styles.quizzAttribute}>Tipo do motor:</span>
                                <span className={styles.quizzValue}>{dictionaries.engine_type[data.engine_type] ?? data.engine_type}</span>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <span className={styles.quizzAttribute}>Tamanho do carro:</span>
                                <span className={styles.quizzValue}>{dictionaries.car_size[data.car_size] ?? data.car_size}</span>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <span className={styles.quizzAttribute}>Faixa de preço:</span>
                                <span className={styles.quizzValue}>{dictionaries.price_range[data.price_range] ?? data.price_range}</span>
                            </div>

                            <button onClick={() => navigate("/veiculos?q=" + data.name)}>
                                Ver Anúncios
                            </button>
                        </div>
                    );
                })
            )}

        </div>
    );
}