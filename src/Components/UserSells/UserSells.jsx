// src/Components/ListaDeDesejos/ListaDeDesejos.js

import { formatDate, formatMoney } from "../../Utils/Utilsformat";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserSells.module.css";
import { Calendar } from 'lucide-react';
import { toast } from "react-toastify";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const VendasUsuario = () => {

  const navigate = useNavigate();
  const [mySells, setMySells] = useState([]);
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
        getMySells()
      ]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  const getMySells = () => {
    axios.get(apiUrl + "sale/sold", { headers: getAuthHeaders() })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "success") {
          setMySells(res.data.data);
        }
      })
      .catch((res) => {
        toast.error("Erro ao adquirir os dados!");
      })
  }

  return (
    <section className={styles.adlistSection}>
      <h2>Lista anúncios postados</h2>
      <p className={styles.adlistDescription}>
        Aqui você consegue ver todos os carros que você já vendeu!
      </p>
      {isLoading ? (
        <div className={styles.skeletonWrapper}>
          <div className={styles.skeletonLoader}></div>
          <div className={styles.skeletonLoader}></div>
          <div className={styles.skeletonLoader}></div>
          <div className={styles.skeletonLoader}></div>
          <div className={styles.skeletonLoader}></div>
        </div>
      ) : (<></>)
      }
      {mySells.length == 0 && isLoading == false ? (
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", border: "solid 1px #8080804d", borderRadius: "10px" }}>
          <div>Você ainda não vendeu nenhum carro</div>
        </div>
      ) : (<></>)}
      <div className={styles.adlistGrid} style={{ width: "100%" }}>
        {
          isLoading == true ? (<></>) : (
            mySells.map((item) => {
              return (
                <div className={styles.adlistItemCard}>
                  <div className={styles.itemImageContainer}>
                    <img
                      src={item.image_url}
                      alt={item.model}
                      className={styles.itemImage}
                    />
                  </div>
                  <h4 className={styles.itemName}>{item.model}</h4>
                  <p className={styles.itemPrice}>{formatMoney(item.value)}</p>
                  <div className={styles.itemDetails}>
                    <Calendar
                      size={22} color="gray"
                    />
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                  <button className={styles.buyButton} onClick={() => { navigate('/anuncio/' + item.ad_id) }}>Ver Detalhes</button>
                </div>
              )
            })
          )
        }
      </div>
    </section>
  );
};

export default VendasUsuario;
