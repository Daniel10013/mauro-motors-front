
// eslint-disable-next-line no-unused-vars
import Header_Home_Login from "../../../Components/Header_Home_Login";
import { formatDate, formatMoney } from "../../../Utils/Utilsformat";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Calendar, Gauge, Car } from 'lucide-react';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Menu from "../Menu/Menu";
import axios from "axios";
import "./Hero.css";

const apiUrl = import.meta.env.VITE_API_URL;
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

const ListagemAnuncios = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    car_type: "",
    min_year: "",
    max_year: "",
    min_price: "",
    max_price: "",
    brand_id: "",
  });
  const [availableAds, setAvailableAds] = useState([]);
  const [originalValueAds, setOriginalValueAds] = useState([]);
  const [isToFilterByQuery, setIsToFilterByQuery] = useState(true);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!isToFilterByQuery) return;

    if (originalValueAds.length > 0) {
      setFiltersFromUrl();
      setIsToFilterByQuery(false);
    }
  }, [originalValueAds]);

  const loadData = async () => {
    try {
      await Promise.all([
        getAvailableAds(),
      ]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    }
  }

  const getAvailableAds = () => {
    axios.get(apiUrl + "ads", { headers: getAuthHeaders() })
      .then((res) => {
        if (res.data.status == "success") {
          setAvailableAds(res.data.data)
          setOriginalValueAds(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Erro ao carregar dados!");
      })
  }

  const setFiltersFromUrl = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const price = queryParams.get('maxPrice');
    const query = queryParams.get('q');
    if (price) {
      setFilters({ ...filters, max_price: price });
    }

    if (query) {
      setSearchValue(query);
    }

    const filtered = originalValueAds.filter((ad) => {
      if (price && ad.value > parseFloat(price)) return false;
      const lowerSearch = query?.toLowerCase() || '';
      const inModel = ad.model.toLowerCase().includes(lowerSearch);
      const inTitle = ad.title.toLowerCase().includes(lowerSearch);
      const isAvailable = ad.status === "available";

      return (inModel || inTitle) && isAvailable;
    });
    setAvailableAds(filtered);
  }

  const searchAd = () => {
    if (!searchValue) {
      return;
    }
    try {
      setIsLoading(true)
      const lowerSearch = searchValue.toLowerCase();
      const search = originalValueAds.filter((ad) => {
        const inModel = ad.model.toLowerCase().includes(lowerSearch);
        const inTitle = ad.title.toLowerCase().includes(lowerSearch);
        const isAvailable = ad.status === "available";

        return (inModel || inTitle) && isAvailable;
      });
      setAvailableAds(search);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  const handleClick = (adId) => {
    navigate(`/anuncio/${adId}`);
  };

  const resetFilter = () => {
    setAvailableAds(originalValueAds)
    setSearchValue("")
    setFilters({
      car_type: "",
      min_year: "",
      max_year: "",
      min_price: "",
      max_price: "",
      brand_id: "",
    });
  }

  const applyFilters = () => {
    const filtered = originalValueAds.filter((ad) => {
      if (filters.car_type && ad.type !== filters.car_type) return false;
      if (filters.min_year && ad.produce_year < parseInt(filters.min_year)) return false;
      if (filters.max_year && ad.produce_year > parseInt(filters.max_year)) return false;
      if (filters.price_min && ad.value < parseFloat(filters.price_min)) return false;
      if (filters.price_max && ad.value > parseFloat(filters.price_max)) return false;
      if (filters.brand_id && ad.brand_id !== parseInt(filters.brand_id)) return false;
      return true;
    });
    setAvailableAds(filtered);
  };

  return (
    <>
      <Header_Home_Login />
      <div className="page-container">
        <aside className="sidebar">
          <Menu filter={filters} setFilter={setFilters} buttonClick={applyFilters} />
        </aside>
        <main className="hero-container">
          <div className="caixaPesquisa">
            <form>
              <input onChange={(e) => setSearchValue(e.target.value)} type="search" name="boxSearch" value={searchValue} className="pesquisaTop" placeholder="Busque pelo seu veículo ideal!" />
              <input type="button" className="BTNpesquisa" value="Buscar" onClick={searchAd} />
              <span className="removeFilters" onClick={() => { resetFilter() }} >Remover Fitros</span>
            </form>
          </div>
          <p className="results-info">
            Foram encontrados <span className="resultQnt">{availableAds.length}</span> resultados para sua pesquisa
          </p>
          {isLoading ? (
            <div className={"skeletonWrapper"}>
              <div className={"skeletonLoader"}></div>
              <div className={"skeletonLoader"}></div>
              <div className={"skeletonLoader"}></div>
              <div className={"skeletonLoader"}></div>
              <div className={"skeletonLoader"}></div>
              <div className={"skeletonLoader"}></div>
              <div className={"skeletonLoader"}></div>
              <div className={"skeletonLoader"}></div>
              <div className={"skeletonLoader"}></div>
              <div className={"skeletonLoader"}></div>
            </div>
          ) : (<></>)}
          {isLoading == true ? (<></>) : (
            availableAds.length == 0 ? (
              <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "300px", gap: "10px" }}>
                <h1 style={{ fontWeight: "500" }}>Nenhum anúncio encontrado! T-T</h1>
                <h2 style={{ fontWeight: "500" }}>Tente Pesquisar outra coisa, ou usar outros filtros!</h2>
              </div>
            ) : (
              <div className="car-grid">
                {availableAds.length != 0 ?
                  availableAds.map((ad, index) => (
                    <div key={index} className="car-card">
                      <img src={ad.image_url} alt={ad.model} className="car-image" />
                      <div className="car-details">
                        <div>
                          <h3>{getCarBrandById(ad.brand_id)} {ad.model}</h3>
                          <div className="info-item price">
                            <p>{formatMoney(ad.value)}</p>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "10px" }}>
                          <div className="info-item cg">
                            <Car size={20} color="#808080b2" />
                            <p>{ad.produce_year}</p>
                          </div>
                          <div className="info-item cg">
                            <Gauge size={20} color="#808080b2" />
                            <p>{ad.kilometers}km</p>
                          </div>
                          <div className="info-item cg">
                            <Calendar size={20} color="#808080b2" />
                            <p>Postado dia: {formatDate(ad.created_at)}</p>
                          </div>
                        </div>
                        <button className="detailsButton" onClick={() => handleClick(ad.ad_id)}>
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                  ))
                  : (<></>)}
              </div>
            )
          )}
        </main>
      </div>
    </>
  );
};

export default ListagemAnuncios;