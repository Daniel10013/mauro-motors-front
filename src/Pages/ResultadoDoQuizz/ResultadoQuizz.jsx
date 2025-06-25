// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import Header_Home_Login from '../../Components/Header_Home_Login'
import './ResultadoQuizz.css'
import QuizzCards from '../../Components/QuizzCards'
import axios from 'axios'
import Loader from "../../Components/Loader";

const apiUrl = import.meta.env.VITE_API_URL;

function ResultadoQuizz() {

    const [resultsQntity, setResultsQntity] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadAll = async () => {
            try {
                await Promise.all([
                    setQuizz()
                ]);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        loadAll();
    }, []);

    const setQuizz = () => {
        axios.get(apiUrl + "quizz", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.data.status == "success") {
                const quizzData = res.data.data;
                setResultsQntity(quizzData.length);
            }
        });
    }
    return (
        <div>
            {loading && <Loader />}
            <Header_Home_Login />
            <div className='AllResultadoQuizz'>
                <h1 className='FirstH1ResultadoQuizz'>Encontramos <span className='FirstSpanResultadoQuizz'>{resultsQntity}</span> carros que batem com as suas preferências!</h1>
                <div className='ResultOfResultadoQuizz'>
                    <QuizzCards isHome={false} />
                </div>
            </div>
        </div>
    )
}

export default ResultadoQuizz