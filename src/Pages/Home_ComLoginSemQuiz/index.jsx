// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

import Header_Home_Login from "../../Components/Header_Home_Login"
import styles from './Home_ComLoginSemQuiz.module.css'
import veiculo from './images/veiculo.png'
import logo from './images/logo.png'
import Carousel from "../../Components/Carrosel";
import Card from "../../Components/Card";
import gol from './images/gol.png'
import quizzQuestion from './images/quizzQuestion.png'

import { Link } from 'react-router-dom';

function Home_ComLoginSemQuiz(){

    const [activeItem, setActiveItem] = useState("Todos");

  // Lista de itens do menu
    const menuItems = ["Todos", "Combustão", "Elétricos", "Aluguel"];

    return(
        <>
        <Header_Home_Login/>
        <div>
            <img className={styles.background_img} src={veiculo} alt="" />
            <img className={styles.overlay_img} src={logo} alt="" />
            <p className={styles.titulo}>MAURO MOTORS</p>

            <div className={styles.box}>
                <h2 className={styles.boxh2}>Começe a busca pelo seu carro ideal!</h2>
                <p className={styles.boxp}>Procure entre os mais de <span>1230</span> veiculos diferentes disponiveis!</p>

                <div className={styles.menu}>
                {menuItems.map((item) => (
                    <span
                    key={item}
                    className={`${styles.menu_item} ${activeItem === item ? styles.active : ""}`}
                    onClick={() => setActiveItem(item)}
                    >
                    {item}
                    </span>
                ))}
                </div>

                <div className={styles.boxpesquisa}>
                    <input type="text" placeholder="Busque por marca, ano, modelo..." className={styles.pesquisa} />
                    <input type="button" value="Buscar" className={styles.boxbtn} />
                </div>
            </div>

        </div>
        
        <div className={styles.SpaceQuiz}>
            <h1>Quer ver os carros que mais combinam com você?</h1>
            <div className={styles.division}>
                <div className={styles.Text}>
                    <p>
                        Responda esse breve <span>quizz</span> para receber anúncios personalizados baseados nos seus gostos!                   
                    </p>
                    <p>
                        Isso vai te garantir uma melhor experiência na nossa plataforma!
                    </p>
                    <Link to={"/Quizz"}>
                    <button className={styles.buttonParaQuizz}>Inicia Quizz</button>
                    </Link>
                </div>
                <div>
                    <img src={quizzQuestion} className={styles.imgQuiz} alt="" />
                </div>
            </div>
        </div>

        <section className={styles.marcas}>
            <h1>Veja as marcas disponiveis!</h1>
            <div className={styles.carrosel}>
                <Carousel/>
            </div>
        </section>

        <div className={styles.cardarea}>
            <h1>Confira os anúncios em alta este mês!</h1>

            <div className={styles.cards}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>

        <div className={styles.faixabranca}>

        </div>

        <div className={styles.Finalh1}>
            <h1>Encontre o preço ideal para o seu bolso</h1>
        </div>

        <div className={styles.FinalSection}>
            <div className={styles.CardCarPrices}>
                <p>Carros Até</p>
                <p>R$ 20.000</p>
                <img src={gol} alt="" />
            </div>
            <div className={styles.CardCarPrices}>
                <p>Carros Até</p>
                <p>R$ 50.000</p>
                <img src={gol} alt="" />
            </div>
            <div className={styles.CardCarPrices}>
                <p>Carros Até</p>
                <p>R$ 80.000</p>
                <img src={gol} alt="" />
            </div>
            <div className={styles.CardCarPrices}>
                <p>Carros Até</p>
                <p>R$ 150.000</p>
                <img src={gol} alt="" />
            </div>
        </div>
        </>
    )
}

export default Home_ComLoginSemQuiz