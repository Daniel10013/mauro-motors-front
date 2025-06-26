import Header_Home_Login from "../../Components/Header_Home_Login";
import { formatDate, formatMoney } from "../../Utils/Utilsformat";
import { useParams, useNavigate, data } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";
import { Heart } from 'lucide-react';
import "./DetalhesAnuncio.css"
import Swal from "sweetalert2";
import axios from "axios";
import userAvatar from "../Perfil/images/user-avatar.png";


const apiUrl = import.meta.env.VITE_API_URL;

function DetalhesAnuncio() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [adData, setAdData] = useState({});
    const [adOwner, setAdOwner] = useState({});
    const [ownerAddress, setOwnerAddress] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        loadAll();
    }, [])

    const loadAll = async () => {
        try {
            await Promise.all([
                getAdData(),
                increaseViews(),
                getFavoritedOnLoad()
            ]);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 800);
        }
    };

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub || null;
    }

    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    const getAdData = () => {
        axios.get(apiUrl + "ad-details/" + id, { headers })
            .then((res) => {
                if (res.data.status == "success") {
                    setAdData(res.data.data[0]);
                    return getUser(res.data.data[0].user_id);
                }
            })
            .catch((res) => {
                Swal.fire({
                    "title": "Erro",
                    "icon": "error",
                    "text": "Erro ao carregar dados!"
                }).then(() => {
                    back();
                })
            });
    }

    const getUser = (userId) => {
        axios.get(apiUrl + "user/" + userId, { headers })
            .then((res) => {
                if (res.data.status == "success") {
                    setAdOwner(res.data.data[0])
                    return getUserAddress()
                }

            })
            .catch((res) => {
                console.error(res);
                Swal.fire({
                    "title": "Erro",
                    "icon": "error",
                    "text": "Erro ao carregar dados!"
                }).then(() => {
                    back();
                })
            });
    }

    const getUserAddress = () => {
        axios.get(apiUrl + "get-address-by-id", { headers })
            .then((res) => {
                if (res.data.status == "success") {
                    setOwnerAddress(res.data.data[0]);
                }
            })
            .catch((res) => {
                Swal.fire({
                    "title": "Erro",
                    "icon": "error",
                    "text": "Erro ao carregar dados!"
                }).then(() => {
                    back();
                })
            });
    }

    const buyCar = () => {
        Swal.fire({
            "title": "Comprar",
            "icon": "question",
            "text": "Deseja comprar este carro?",
            "showDenyButton": true,
            "denyButtonText": "Não",
            "confirmButtonText": "Sim",
            "confirmButtonColor": "green"
        }).then((res) => {
            if (res.isConfirmed) {
                axios.post(apiUrl + "sale", { "ad_id": id }, { headers })
                    .then((res) => {
                        if (res.data.status == "success") {
                            Swal.fire({
                                "title": "Parabéns!",
                                "icon": "succcess",
                                "text": "Seu carro foi comprado com sucesso!"
                            }).then(() => {
                                navigate('/perfil?tab=myPurchases')
                            })
                        }
                    })
                    .catch((res) => {
                        Swal.fire({
                            "title": "Erro",
                            "icon": "error",
                            "text": "Erro ao carregar dados!"
                        }).then(() => {
                            back();
                        })
                    });
            }
        })
    }

    const getFavoritedOnLoad = () => {
        axios.get(apiUrl + "wishlist", { headers })
            .then((res) => {
                if (res.data.status == "success") {
                    const favoriteAd = res.data.data.find(item => item.ad_id == id)
                    if (favoriteAd) {
                        setFavoriteId(favoriteAd.id);
                        setIsFavorite(true);
                    }
                }
            })
            .catch(() => {
                toast.error("Erro pegar dados sobre favoritos!", {
                    autoClose: 1500
                });
            });
    }

    const favoriteAd = () => {
        axios.post(apiUrl + "wishlist", { "ad_id": id }, { headers })
            .then((res) => {
                if (res.data.status == "success") {
                    setIsFavorite(true);
                    toast.success("Anúncio adicionado à lista de desejos!", { autoClose: 1500 });
                    setFavoriteId(res.data.data.created_id)
                }
            })
            .catch(() => {
                toast.error("Erro ao adicionar item à lista de desejos!", {
                    autoClose: 1500
                });
            });
    }

    const removeFavorite = () => {
        axios.delete(apiUrl + "wishlist/" + favoriteId, { headers })
            .then((res) => {
                if (res.data.status == "success") {
                    setIsFavorite(false);
                    toast.error("Anúncio removido da lista de desejos!", { autoClose: 1500 });
                    setFavoriteId(0)
                }
            })
            .catch(() => {
                toast.error("Erro ao remover item à lista de desejos!", {
                    autoClose: 1500
                });
            });
    }

    const carBrands = [
        { id: 1, name: "Volkswagen" },
        { id: 2, name: "Fiat" },
        { id: 4, name: "Chevrolet" },
        { id: 5, name: "Toyota" },
        { id: 6, name: "Hyundai" },
        { id: 7, name: "Renault" },
        { id: 8, name: "Honda" },
        { id: 9, name: "Ford" },
        { id: 10, name: "Nissan" },
        { id: 11, name: "Jeep" },
        { id: 12, name: "Peugeot" },
        { id: 13, name: "Citroën" },
        { id: 14, name: "Mitsubishi" },
        { id: 15, name: "Kia" },
        { id: 16, name: "Mercedes-Benz" },
        { id: 17, name: "BMW" },
        { id: 18, name: "Audi" },
        { id: 19, name: "Volvo" },
        { id: 20, name: "Land Rover" },
        { id: 21, name: "Subaru" },
        { id: 22, name: "Iveco" },
        { id: 23, name: "Porsche" },
        { id: 24, name: "Dodge" },
        { id: 25, name: "Lexus" },
        { id: 26, name: "Mini" },
        { id: 27, name: "Suzuki" },
        { id: 28, name: "BYD" },
        { id: 29, name: "Tesla" },
        { id: 30, name: "Maserati" },
        { id: 31, name: "Ferrari" },
        { id: 32, name: "Lamborghini" },
        { id: 33, name: "Aston Martin" },
        { id: 42, name: "Corvette" },
        { id: 43, name: "Mazda" },
        { id: 44, name: "Mustang" },
        { id: 45, name: "Alfa Romeo" },
        { id: 46, name: "Abarth" },
        { id: 47, name: "Pagani" },
        { id: 48, name: "McLaren" },
    ];

    const getCarBrandById = (dataId) => {
        return carBrands.find((brand) => brand.id === dataId)?.name;
    }

    const increaseViews = () => {
        axios.put(apiUrl + "views", { ad_id: id }, { headers })
    }

    const back = () => {
        history.back();
    };
    if (loading) return <Loader />;
    return (
        <div>
            <Header_Home_Login />
            <div>
                <p className="BackToListDetalhes" onClick={back}>← Voltar</p>
            </div>
            <div className="HeaderBoxDetalhes">
                <div></div>
                <div className="HeaderCarroselInfoDetalhes">
                    <div className="HeaderInfoDetalhes">
                        <h2>{getCarBrandById(adData.brand_id)} {adData.model}</h2>
                        {adData.user_id !== Number(getUserIdFromToken()) && adData.status === "available" ? (
                            <Heart
                                size={32}
                                strokeWidth={2}
                                className={isFavorite ? "favoritedIcon" : "favoriteIcon"}
                                onClick={isFavorite ? removeFavorite : favoriteAd}
                            />
                        ) : (
                            <></>
                        )}

                    </div>
                    <img src={adData.image_url} style={{ borderRadius: "10px", height: "550px", marginLeft: "40px", width: "850px" }} />
                </div>
                <div className="HeaderLeftDetalhes">
                    <div className="HeaderInfoVendedorDetalhes">
                        {adData.user_id !== Number(getUserIdFromToken()) ? (
                            <h2>Informações do Vendedor</h2>
                        ) : (
                            <h2>Informações do seu anúncio</h2>
                        )}
                        <div className="ownerInfo">
                            <div className="avatar">
                                <img
                                    src={adOwner.file_name == null ? userAvatar : adOwner.file_name}
                                    alt="User Avatar"
                                />{" "}
                            </div>
                            <p>{adOwner.name}</p>
                        </div>
                        <p className="HeaderInfoVendedorDetalhesP">Cadastrado desde {formatDate(adOwner.created_at)}</p>
                        {ownerAddress.state != null || ownerAddress.city == null ? (
                            <></>
                        ) : (
                            <>
                                <p className="HeaderInfoVendedorDetalhesLocation">{ownerAddress.estate} - {ownerAddress.city}</p>
                            </>
                        )}
                    </div>
                    {adData.status === "available" ? (
                        <>
                            <div className="HeaderContactVendedorDetalhes">
                                <p>Mais informações</p>
                                <p className="HeaderContactVendedorDetalhesNegrito">Entre em contato</p>
                                <p>{adOwner.phone}</p>
                            </div>
                            <div className="HeaderPriceVendedorDetalhes">
                                <p>{formatMoney(adData.value)}</p>
                            </div>
                            {adData.user_id !== Number(getUserIdFromToken()) ? (
                                <div className="HeaderBuyVendedorDetalhes" onClick={buyCar}>
                                    <p>Comprar</p>
                                </div>
                            ) : (
                                <div className="HeaderContactVendedorDetalhes">
                                    <p>Visualizações do seu anúncio: </p>
                                    <p>{adData.number_views}</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="HeaderContactVendedorDetalhes">
                                <p>Que pena! </p>
                                <p>Esse veículo não está mais disponível</p>
                            </div>
                        </>
                    )}

                </div>
            </div>
            <div className="BottomSectionDetalhes">
                <div className="MidInfoAdDetalhes">
                    <h2 className="NameAnuncioDetalhes">{adData.description}</h2>
                    <h2 className="DetailsAnuncioDetalhes">Detalhes</h2>
                    <div className="DetailsOutsideDetalhes">
                        <div className="DetailsInsideDetalhes">
                            <div>
                                <p className="DetailsInsidePDetalhes">Motor</p>
                                <p className="DetailsInsideUnder">{adData.engine_info}</p>
                            </div>
                            <div>
                                <p className="DetailsInsidePDetalhes">Marca</p>
                                <p className="DetailsInsideUnder">{getCarBrandById(adData.brand_id)}</p>
                            </div>
                            <div>
                                <p className="DetailsInsidePDetalhes">Ano</p>
                                <p>{adData.produce_year}</p>
                            </div>
                            <div>
                                <p className="DetailsInsidePDetalhes">Placa</p>
                                <p>{adData.license_plate}</p>
                            </div>
                        </div>
                        <div className="DetailsInsideDetalhes">
                            <div>
                                <p className="DetailsInsidePDetalhes">Kilometragem</p>
                                <p>{adData.kilometers}</p>
                            </div>
                            <div>
                                <p className="DetailsInsidePDetalhes">Cor</p>
                                <p>{adData.color}</p>
                            </div>
                        </div>
                    </div>
                    <h2 className="DetailsAnuncioDetalhes">Localização</h2>
                    <div className="DetailsInsideDetalhes">
                        <div>
                            <p className="DetailsInsidePDetalhes">CEP</p>
                            <p>{ownerAddress.zip_code}</p>
                        </div>
                        {ownerAddress.estate == null || ownerAddress.city == null ? (
                            <></>
                        ) : (
                            <>
                                <div>
                                    <p className="DetailsInsidePDetalhes">Estado</p>
                                    <p>{ownerAddress.estate}</p>
                                </div>
                                <div>
                                    <p className="DetailsInsidePDetalhes">Cidade</p>
                                    <p>{ownerAddress.city}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalhesAnuncio;
