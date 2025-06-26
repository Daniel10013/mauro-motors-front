
import Header_Home_Login from "../../Components/Header_Home_Login";
import styles from "./DetalhesAvaliacao.module.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const DetailsReview = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [review, setReview] = useState({});

    const getAuthHeaders = () => ({
        Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    useEffect(() => {
        loadAll();
    }, [])

    const loadAll = async () => {
        try {
            await Promise.all([
                getReview()
            ]);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    };

    const getReview = () => {
        axios.get(apiUrl + "review/" + id, { headers: getAuthHeaders() })
        .then((res) => {
            if(res.data.status == "success"){
                if(res.data.data.length == 0){
                    navigate("/avaliacoes")
                }
                setReview(res.data.data[0]);
            }   
        })
        .catch((err) => {
            toast.error("Erro ao carregar dados!");
            setIsLoading(true);
        })
    }

    return (
        <>
            <Header_Home_Login />
            <section className={styles.pageContainer}>
                <button onClick={() => { navigate("/avaliacoes") }} className={styles.backButton}>
                    &larr; Voltar para avaliações
                </button>
                {isLoading ? (<>
                    <div className={styles.reviewContainer}>
                        {/* Coluna da Esquerda */}
                        <div className={styles.leftColumn}>
                            <h2 className={styles.mainTitle}>
                                Detalhes da Avaliação{" "}
                            </h2>

                            <div className={[styles.detailImage, styles.skeletonLoader].join(" ")}>
                            </div>

                            <h3 style={{ height: "30px" }} className={[styles.reviewTitle, styles.skeletonLoader].join(" ")}>{" "}</h3>

                            <div style={{ height: "110px" }} className={[styles.reviewContentBox, styles.skeletonLoader].join(" ")}>
                                {" "}
                            </div>

                            <div style={{ height: "83px" }} className={[styles.ratingSection, styles.skeletonLoader].join(" ")}>
                                {" "}
                            </div>
                        </div>

                        {/* Coluna da Direita */}

                        <div className={styles.rightColumn}>
                            <div className={styles.detailsCard}>
                                <h4 className={styles.detailsTitle}>Detalhes</h4>
                                <div style={{ height: "171px", marginTop: "10px" }} className={[styles.detailsGrid, styles.skeletonLoader].join(" ")}>
                                    {" "}
                                </div>
                            </div>
                        </div>
                    </div>
                </>) : (
                    <div className={styles.reviewContainer}>
                        {/* Coluna da Esquerda */}
                        <div className={styles.leftColumn}>
                            <h2 className={styles.mainTitle}>
                                Detalhes da Avaliação{" "}
                            </h2>

                            <img
                                src={review.file_name}
                                alt={review.model}
                                className={styles.detailImage}
                            />

                            <h3 className={styles.reviewTitle}>{review.title}</h3>

                            <div className={styles.reviewContentBox}>
                                <p>{review.description}</p>
                            </div>

                            <div className={styles.ratingSection}>
                                <p className={styles.ratingLabel}>Nota final:</p>
                                <div className={styles.stars}>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={styles.star}>
                                            {i < review.avaliation ? "★" : "☆"}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Coluna da Direita */}

                        <div className={styles.rightColumn}>
                            <div className={styles.detailsCard}>
                                <h4 className={styles.detailsTitle}>Detalhes</h4>
                                <div className={styles.detailsGrid}>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>Modelo</span>
                                        <span className={styles.detailValueLink}>
                                            {review.model}
                                        </span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>Marca</span>
                                        <span className={styles.detailValueLink}>{review.name}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>Ano</span>
                                        <span className={styles.detailValue}>{review.year}</span>
                                    </div>
                                </div>

                                <Link to={"/veiculos?q=" + review.model} className={styles.buttonLink}>
                                    <button className={styles.viewAdsButton}>Ver Anuncios</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default DetailsReview;
