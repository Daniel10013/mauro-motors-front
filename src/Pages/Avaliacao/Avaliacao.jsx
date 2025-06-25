import React, { useEffect, useState } from "react";
import styles from "./Avaliacao.module.css";
import { useNavigate } from "react-router-dom";
import Header_Home_Login from "../../Components/Header_Home_Login";
import Select from 'react-select';
import carro1 from "../../assets/supermaurocars.png";
import carro2 from "../../assets/porsche.png";
import axios from "axios";
import { toast } from "react-toastify";
import { formatDate } from "../../Utils/Utilsformat";


const apiUrl = import.meta.env.VITE_API_URL;
const carBrandsOptions = [
  { value: 1, label: "Volkswagen" },
  { value: 2, label: "Fiat" },
  { value: 4, label: "Chevrolet" },
  { value: 5, label: "Toyota" },
  { value: 6, label: "Hyundai" },
  { value: 7, label: "Renault" },
  { value: 8, label: "Honda" },
  { value: 9, label: "Ford" },
  { value: 10, label: "Nissan" },
  { value: 11, label: "Jeep" },
  { value: 12, label: "Peugeot" },
  { value: 13, label: "Citroën" },
  { value: 14, label: "Mitsubishi" },
  { value: 15, label: "Kia" },
  { value: 16, label: "Mercedes-Benz" },
  { value: 17, label: "BMW" },
  { value: 18, label: "Audi" },
  { value: 19, label: "Volvo" },
  { value: 20, label: "Land Rover" },
  { value: 21, label: "Subaru" },
  { value: 22, label: "Iveco" },
  { value: 23, label: "Porsche" },
  { value: 24, label: "Dodge" },
  { value: 25, label: "Lexus" },
  { value: 26, label: "Mini" },
  { value: 27, label: "Suzuki" },
  { value: 28, label: "BYD" },
  { value: 29, label: "Tesla" },
  { value: 30, label: "Maserati" },
  { value: 31, label: "Ferrari" },
  { value: 32, label: "Lamborghini" },
  { value: 33, label: "Aston Martin" },
  { value: 42, label: "Corvette" },
  { value: 43, label: "Mazda" },
  { value: 44, label: "Mustang" },
  { value: 45, label: "Alfa Romeo" },
  { value: 46, label: "Abarth" },
  { value: 47, label: "Pagani" },
  { value: 48, label: "McLaren" },
];


const Avaliacao = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [originalReviews, setOriginalReviews] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  useEffect(() => {
    loadData();
  }, [])


  const loadData = async () => {
    try {
      await Promise.all([
        getReviews()
      ]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  const getReviews = () => {
    axios.get(apiUrl + "get-all-reviews", { headers: getAuthHeaders() })
      .then((res) => {
        if (res.data.status == "success") {
          console.log(res.data.data);
          setReviews(res.data.data);
          setOriginalReviews(res.data.data);
        }
      })
      .catch((res) => {
        toast.error("Erro ao carregar avaliações!");
        setReviews([]);
        setIsLoading(true);
      })
  }

  const filterReviews = () => {
    try {
      setIsLoading(true);
      const filtered = originalReviews.filter((review) => {
        if (searchValue && review.model.toLowerCase().includes(searchValue.toLowerCase()) == false) return false;
        if (selectedBrand && review.car_brand_id !== parseInt(selectedBrand)) return false;
        return true;
      });
      setReviews(filtered);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  }

  const removeFilters = () => {
    try {
      setIsLoading(true);
      setSearchValue("");
      setSelectedBrand(null)
      setReviews(originalReviews)
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  }

  return (
    <section className={styles.container}>
      <Header_Home_Login />
      <div className={styles.content}>
        <h2 className={styles.title}>Está com alguma dúvida?</h2>
        <p className={styles.subtitle}>
          Confira as avaliações de outros usuários e descubra tudo sobre seu
          próximo carro!
        </p>

        <div className={styles.filters}>
          <Select
            value={carBrandsOptions.find((opt) => opt.value === selectedBrand) || null}
            className={styles.brandsSelect}
            styles={{
              control: (provided, state) => ({
                ...provided,
                border: state.isFocused ? 'solid 1px #BC4547' : 'solid 1px #D9D9D9',
                boxShadow: state.isFocused ? '0 0 0 1px #BC4547' : 'none',
                '&:hover': {
                  borderColor: state.isFocused ? '#BC4547' : '#aaa'
                }
              })
            }}
            menuPlacement="bottom"
            options={carBrandsOptions}
            placeholder="Selecione a marca"
            onChange={(e) => { setSelectedBrand(e.value) }}
          />
          <div className={styles.searchGroup}>
            <input
              type="text"
              placeholder="Buscar modelo de carro"
              className={styles.searchInput}
              value={searchValue}
              onChange={(e) => { setSearchValue(e.target.value) }}
            />
            <button className={styles.searchButton} onClick={() => { filterReviews() }}>Buscar</button>
          </div>
        </div>

        <div className={styles.resultsContainer}>
          <p className={styles.results}>
            {reviews.length != 0 && (
              <>Foram encontradas {reviews.length} avaliações</>
            )}
          </p>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <span className={styles.removeFilters} onClick={() => { removeFilters() }}>Remover filtros</span>
            <button
              className={styles.postReviewButton}
              onClick={() =>
                navigate("/postar-avaliacao")
              }
            >
              Postar Avaliação
            </button>
          </div>
        </div>

        <div className={styles.cards}>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className={styles.skeletonLoader}></div>
            ))
          ) : (
            reviews.length == 0 ? (
              <div className={styles.notFound}>
                Nenhuma avaliação encontrada ainda!
              </div>
            ) :
              reviews.map((review) => (
                <div
                  key={review.id}
                  className={styles.card}
                  onClick={() => navigate("/avaliacao/" + review.id)}
                >
                  <div className={styles.cardContent}>
                    <div className={styles.carInfo}>
                      <span className={styles.carModel}>
                        {review.model}
                      </span>
                      <span className={styles.carBrand}>{review.name}</span>
                    </div>
                    <p className={styles.cardTitle}>{review.title}</p>
                    <p className={styles.postedDate}>
                      Postado dia: {formatDate(review.created_at)}
                    </p>
                    <div className={styles.cardStars}>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < review.avaliation
                              ? styles.filledStar
                              : styles.emptyStar
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
          )}

        </div>
      </div>
    </section>
  );
};

export default Avaliacao;
