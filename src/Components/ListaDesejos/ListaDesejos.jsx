// src/Components/ListaDeDesejos/ListaDeDesejos.js

import { formatMoney } from "../../Utils/Utilsformat";
import React, { useState, useEffect } from "react";
import styles from "./ListaDesejos.module.css";
import { useNavigate } from "react-router-dom";
import image from "../../assets/porsche.png";
import { toast } from "react-toastify";
import { Heart } from 'lucide-react';
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const ListaDeDesejos = () => {

  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([
        getFavorites()
      ]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  const getFavorites = () => {
    axios.get(apiUrl + "wishlist", { headers: getAuthHeaders() })
      .then((res) => {
        console.log(res.data)
        if (res.data.status == "success") {
          setFavorites(res.data.data);
        }
      })
  }

  const removeFavorite = (favoriteId) => {
    axios.delete(apiUrl + "wishlist/" + favoriteId, { headers: getAuthHeaders() })
      .then((res) => {
        if (res.data.status == "success") {
          toast.error("Anúncio removido da lista de desejos!", { autoClose: 1500 });
          setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
        }
      })
      .catch(() => {
        toast.error("Erro ao remover item à lista de desejos!", {
          autoClose: 1500
        });
      });
  }

  return (
    <section className={styles.wishlistSection}>
      <h2>Lista de desejos</h2>
      <p className={styles.wishlistDescription}>
        Encontre os seus itens favoritos prontos para compra!
      </p>
      {isLoading ? (
        <div className={styles.skeletonWrapper}>
          <div className={styles.skeletonLoader}></div>
          <div className={styles.skeletonLoader}></div>
          <div className={styles.skeletonLoader}></div>
          <div className={styles.skeletonLoader}></div>
          <div className={styles.skeletonLoader}></div>
        </div>
      ) : (<></>)}
      {favorites.length == 0 && isLoading == false ? (
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", border: "solid 1px #8080804d", borderRadius: "10px" }}>
          <div>Nenhum Item favoritado ainda!</div>
        </div>
      ) : (<></>)}
      <div className={styles.wishlistGrid} style={{ width: "100%" }}>
        {isLoading == true ? (<></>) : (
          favorites.length == 0 ? (
            <></>
          ) :
            favorites.map((item) => (
              <div key={item.id} className={styles.wishlistItemCard}>
                <div className={styles.itemImageContainer}>
                  <img
                    src={item.image_url}
                    alt={item.model}
                    className={styles.itemImage}
                  />
                  <Heart
                    size={24}
                    strokeWidth={2}
                    className={["favoritedIcon", styles.heartIcon].join(" ")}
                    onClick={() =>
                      removeFavorite(item.id)
                    }
                  />
                </div>
                <h4 className={styles.itemName}>{item.model}</h4>
                <p className={styles.itemPrice}>{formatMoney(item.value)}</p>
                <div className={styles.itemDetails}>
                  <span>{item.produce_year}</span>
                  <span>{item.kilometers}km</span>
                </div>
                <button className={styles.buyButton} onClick={() => { navigate('/anuncio/' + item.ad_id) }}>Comprar</button>
              </div>
            ))
        )}
      </div>
    </section>
  );
};

export default ListaDeDesejos;
