// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header_Home_Login from "../../Components/Header_Home_Login"
import styles from './Home_ComLogin.module.css'
import { useNavigate } from 'react-router-dom';
import veiculo from './images/veiculo.png'
import logo from './images/logo.png'
import Carousel from "../../Components/Carrosel";
import Card from "../../Components/Card";
import gol from './images/gol.png'
import QuizzPendente from "../../Components/QuizzPendente";
import QuizzCards from "../../Components/QuizzCards"
import Loader from "../../Components/Loader";
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;


function Home_ComLogin() {
    const navigate = useNavigate();

    const [quizz, setQuizz] = useState(false);
    const [anunciosEmAlta, setAnunciosEmAlta] = useState([]);
    const [quantidadeAnuncios, setQuantidadeAnuncios] = useState(0);
    const [searchMenu, setSearchMenu] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAll();
    }, [])

    const loadAll = async () => {
        try {
            await Promise.all([
                hasQuizz(),
                getAnunciosEmAlta(),
                getAdsQuantity()
            ]);
        } finally {
            // setTimeout(() => {
            //     setLoading(false);
            // }, 500);
        }
    };

    async function hasQuizz() {
        axios.get(apiUrl + "check-quizz", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.data.status == "success") {
                setQuizz(res.data.data);
            }
        });
    }

    async function getAnunciosEmAlta() {
        axios.get(apiUrl + "order-ads-by-views", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.data.status == "success") {
                setAnunciosEmAlta(res.data.data);
            }
        });
    }

    async function getAdsQuantity() {
        axios.get(apiUrl + "ads", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.data.status == "success") {
                setQuantidadeAnuncios(res.data.quantity);
            }
        });
    }

    const handleRedirect = (price) => {
        navigate(`/veiculos?maxPrice=${price}`);
    };

    // if (loading) return <Loader />;
    return (
        <>
            {loading && <Loader />}
            <div style={{ display: loading ? 'none' : 'block' }}>
                <Header_Home_Login />
                <img className={styles.background_img} src={veiculo} onLoad={()=>{setTimeout(()=>{setLoading(false)}, 500)}} alt="" />
                <img className={styles.overlay_img} src={logo} alt="" />
                <p className={styles.titulo}>MAURO MOTORS</p>

                <div className={styles.box}>
                    <h2 className={styles.boxh2}>Começe a busca pelo seu carro ideal!</h2>
                    <p className={styles.boxp}>Procure entre os mais de <span>{quantidadeAnuncios}</span> veiculos diferentes disponiveis!</p>

                    <div className={styles.boxpesquisa}>
                        <input type="text" placeholder="Digite aqui" className={styles.pesquisa} onChange={(e)=>{setSearchMenu(e.target.value)}}/>
                        <input type="button" value="Buscar" className={styles.boxbtn} onClick={(e)=>{
                            if(!searchMenu)return;
                            navigate("/veiculos?q=" + searchMenu);    
                        }}
                        />
                    </div>
                </div>
            </div>

            {quizz ? (
                <div className={styles.quizzCardsSection} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <div className={styles.quizzCardsTop} style={{ width: "100%" }}>
                        <h1>Veja os carros selecionados para você!</h1>
                        <Link to={'/quizz'} className={styles.changeQuizz}>
                            Alterar Preferências
                        </Link>
                    </div>
                    <QuizzCards isHome={true} />
                    <button className={styles.buttonResultadoQuizz} onClick={() => { navigate('/resultado-quizz') }} >Veja Mais!</button>
                </div>
            ) : (
                <QuizzPendente />
            )}

            <section className={styles.marcas}>
                <h1>Veja as marcas disponiveis!</h1>
                <div className={styles.carrosel}>
                    <Carousel />
                </div>
            </section>

            <div className={styles.cardarea}>
                <h1>Confira os anúncios em alta este mês!</h1>
                <div className={styles.cards} >
                    {anunciosEmAlta.length === 0 ? (
                        <p className={styles.noAds}>Nenhum item encontrado.</p>
                    ) : (
                        anunciosEmAlta.map((item, key) => (
                            <Card id={item.ad_id} image={item.image_url} name={item.model} price={item.value} km={item.kilometers} date={item.created_at} />
                        ))
                    )}
                </div>
            </div>

            <div className={styles.Finalh1} style={{marginTop: "50px"}}>
                <h1>Encontre o preço ideal para o seu bolso</h1>
            </div>

            <div className={styles.FinalSection}>
                <div className={styles.CardCarPrices} onClick={() => handleRedirect(20000)}>
                    <p>Carros Até</p>
                    <p>R$ 20.000</p>
                    <img src={gol} alt="" />
                </div>
                <div className={styles.CardCarPrices} onClick={() => handleRedirect(50000)}>
                    <p>Carros Até</p>
                    <p>R$ 50.000</p>
                    <img src={gol} alt="" />
                </div>
                <div className={styles.CardCarPrices} onClick={() => handleRedirect(80000)}>
                    <p>Carros Até</p>
                    <p>R$ 80.000</p>
                    <img src={gol} alt="" />
                </div>
                <div className={styles.CardCarPrices} onClick={() => handleRedirect(150000)}>
                    <p>Carros Até</p>
                    <p>R$ 150.000</p>
                    <img src={gol} alt="" />
                </div>
            </div>
        </>
    )
}

export default Home_ComLogin