import { useState, useEffect } from "react";
import Header_Home_Login from "../../Components/Header_Home_Login";
import styles from "./Cadastro_Anuncio.module.css";
import upload from "./images/upload.png";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;
const uploadImageUrl = import.meta.env.VITE_IMAGE_API_URL;

function Cadastro_Anuncio() {

  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [engine, setEngine] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [displayPrice, setDisplayPrice] = useState("");
  const [description, setDescription] = useState("");

  const [brandsSelect, setBrandsSelect] = useState([]);

  useEffect(() => {
    setBrands();
  }, []);

  const setBrands = () => {
    axios.get(apiUrl + "brands")
      .then((res) => {
        setBrandsSelect(res.data.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar marcas disponiveis:", err);
      });
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (allowedTypes.includes(file.type.toLowerCase()) == false) {
      Swal.fire({
        "title": "Imagem Inválida",
        "icon": "error",
        "text": "O formato da imagem deve ser: PNG, JPEG, JPG OU WEBP!"
      });
      setPhoto(null);
      return;
    }
    setPhoto(file);
  }

  const validateForm = () => {
    if (
      photo === null ||
      model.trim() === "" ||
      brand.trim() === "" ||
      kilometers.trim() === "" ||
      color.trim() === "" ||
      plate.trim() === "" ||
      year.trim() === "" ||
      type.trim() === "" ||
      engine.trim() === "" ||
      title.trim() === "" ||
      price.trim() === "" ||
      description.trim() === ""
    ) {
      return false;
    }

    return true;
  };

  const validateNumbers = () => {
    if (
      Number.isInteger(Number(kilometers)) == false ||
      Number.isInteger(Number(year)) == false ||
      typeof Number(price) !== "number"
    ) {
      return false;
    }

    return true;
  }

  Swal.close();
  const postAd = () => {
    if (validateForm() == false) {
      Swal.fire({
        "title": "Erro",
        "text": "Preencha todos os campos para criar o anúncio!",
        "icon": "error"
      });
      return;
    }

    if (validateNumbers() == false) {
      Swal.fire({
        "title": "Erro",
        "text": "Preço, Kilometragem e Ano de fabricação devem ser números!",
        "icon": "error"
      });
      return;
    }

    // se salvar certo o veiculo, salva o anuncio, e apos, salva a imagem.
    saveVehicle();
  }

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  const saveVehicle = () => {
    Swal.fire({
      title: "Aguarde",
      icon: "info",
      allowOutsideClick: false,
      text: "Aguarde enquanto salvamos o seu anúncio!",
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const vehicleData = {
      "model": model,
      "produce_year": Number(year),
      "kilometers": Number(kilometers),
      "brand_id": Number(brand),
      "color": color,
      "type": type,
      "license_plate": plate,
      "engine_info": engine
    }

    axios.post(apiUrl + "vehicles", vehicleData, { headers })
      .then((res) => {
        if (res.data.status == "success") {
          saveAd(res.data.vehicle_id);
        }
      })
      .catch((err) => {
        Swal.fire({
          "title": "Erro!",
          "text": err.response.data.message,
          "icon": "error"
        })
      });
  }

  const saveAd = (vehicleId) => {
    const adData = {
      "title": title,
      "description": description,
      "value": price,
      "vehicle_id": vehicleId
    }

    axios.post(apiUrl + "ad", adData, { headers })
      .then((res) => {
        if (res.data.status == "success") {
          uploadImage(res.data.data.id);
        }
      })
      .catch((err) => {
        Swal.fire({
          "title": "Erro!",
          "text": err.response.data.message,
          "icon": "error"
        })
      });
  }

  const uploadImage = (adId) => {
    const formData = new FormData();
    formData.append("image", photo);
    axios.post(uploadImageUrl, formData)
      .then((res) => {
        if (res.status == 200) {
          saveAdImageAndRedirect(res.data.data.display_url, adId)
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          "title": "Erro!",
          "text": "Erro ao salvar Imagem!",
          "icon": "error"
        })
      });
  }

  const saveAdImageAndRedirect = (imageUrl, adId) => {
    const imageData = {
      "ad_id": adId,
      "file_name": imageUrl
    }

    axios.post(apiUrl + "save-ad-photo", imageData, { headers })
      .then((res) => {
        if (res.data.status == "success") {
          Swal.close();
          Swal.fire({
            title: "Párabens!",
            icon: "success",
            allowOutsideClick: false,
            text: "Seu carro já está anunciado! Pressione o botão para ser redirecionado á página do seu anúncio!",
            didOpen: () => {
              Swal.hideLoading()
            }
          }).then(() => {
            navigate(`/anuncio/${adId}`);
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          "title": "Erro!",
          "text": err.response.data.message,
          "icon": "error"
        })
      });

  }

  const cleanCurrency = (value) => {
    return value.replace(/\D/g, "");
  };

  const formatCurrency = (value) => {
    const digits = value.replace(/\D/g, "");
    const number = Number(digits);
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  const handlePriceChange = (e) => {
    const input = e.target.value;
    const digitsOnly = input.replace(/\D/g, "");
    setPrice(digitsOnly);
  };

  return (
    <>
      <Header_Home_Login />
      <main>
        <section className={styles.texts}>
          <h1>Cadastro de Anúncios</h1>
          <p>Preencha os dados solicitados para anunciar seu veiculo!</p>
        </section>

        <section className={styles.data}>
          <div className={styles.insideData}>
            <h1>Preencha as informações do veículo</h1>

            <div className={styles.file}>
              <div className={styles.upload_container}>
                <label htmlFor="file-input" className={styles.upload_box}>
                  <p>
                    {photo == null ? (
                      <>
                        Arraste as fotos para, ou{" "}
                        <span className={styles.upload_link}>
                          clique aqui para selecionar
                        </span>
                      </>
                    ) : (
                      <span style={{ color: 'green' }}>
                        Imagem adicionada com sucesso!
                      </span>
                    )}
                  </p>
                  {photo == null ? (
                    <>
                      <img src={upload} alt="upload icon" />
                      <p className={styles.upload_info}>
                        Adicione 1 foto nos formatos PNG, JPG, JPEG ou WEBP
                      </p>
                    </>
                  ) : (
                    <>
                      <img src={"https://static.thenounproject.com/png/2007431-200.png"} alt="uploaded" style={{ height: "56px", opacity: "0.6" }} />
                      <p className={styles.upload_info}
                        style={{ color: "red", textDecoration: "underline", cursor: "pointer" }}
                        onClick={() => { setPhoto(null) }}
                      >
                        Clique aqui para remover
                      </p>
                    </>
                  )}
                  <input
                    id="file-input"
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    multiple
                    hidden
                    onChange={(e) => { handlePhotoUpload(e) }}
                  />
                </label>
              </div>
            </div>

            <div className={styles.form_container}>
              <form>
                <div className={styles.form_group}>
                  <input
                    type="text"
                    placeholder="Modelo do carro (Sem a marca)"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="" disabled>Marca</option>
                    {brandsSelect.map((brandData, key) => {
                      return (
                        <option key={brandData.id} value={brandData.id}>{brandData.name}</option>
                      )
                    })}
                  </select>
                </div>

                <div className={styles.form_group}>
                  <input
                    type="number"
                    placeholder="Kilometragem"
                    value={kilometers}
                    onChange={(e) => setKilometers(e.target.value)}
                  />
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value="" disabled>
                      Cor
                    </option>
                    <option value="preto">Preto</option>
                    <option value="branco">Branco</option>
                    <option value="prata">Prata</option>
                    <option value="cinza">Cinza</option>
                    <option value="vermelho">Vermelho</option>
                    <option value="amarelo">Amarelo</option>
                    <option value="azul">Azul</option>
                    <option value="personalizada">Personalizada</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Placa"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Ano"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>

                <div className={styles.form_group}>
                  <select
                    className={styles.smallSelect}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione o tipo
                    </option>
                    <option value="hatch">Hatch</option>
                    <option value="coupe">Cupê</option>
                    <option value="suv">SUV</option>
                    <option value="offroad">Off‑road</option>
                    <option value="sedan">Sedã</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Informações do motor"
                    value={engine}
                    onChange={(e) => setEngine(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>

          <div className={styles.mid}>
            <p>.</p>
          </div>

          <div className={styles.insideData}>
            <h1>Preencha as informações do anúncio</h1>
            <div className={styles.forms2}>
              <form>
                <div className={styles.formTop}>
                  <input
                    type="text"
                    placeholder="Título do anúncio (Apenas para fins de busca!)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className={styles.formMid}>
                  <input
                    type="text"
                    placeholder="Informe o preço"
                    value={formatCurrency(price)}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className={styles.textbox}>
                  <div className={styles.textarea_container}>
                    <label>Descrição do anúncio:</label>
                    <textarea
                      id="descricao"
                      maxLength={500}
                      placeholder="Digite aqui..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <div className={styles.note}>
                      Obs: Limite de 500 caracteres, não use código HTML ou
                      Markdown.
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className={styles.pageBottom}>
          <div className={styles.bottomLeft}>
            <div className={styles.bottomText}>
              <h1>Tudo okay com seu anúncio?</h1>
              <p style={{ width: "95%" }}>
                Confira os dados novamente, caso esteja tudo certo, confirme a
                publicação do seu anúncio no botão abaixo
              </p>
            </div>
            <div className={styles.bottomBtn} onClick={postAd}>
              <input type="submit" value="Postar anúncio" />
            </div>
          </div>

          <div className={styles.bottomRight}>
            <h1>O que acontece depois de postar?</h1>
            <ul>
              <li>Seu anuncio fica pendente para revisao por um administrador</li>
              <li>
                Caso exista algum problema, você ira receber e-mail avisando
                para que você possa alterar
              </li>
              <li>
                Se tudo estiver okay, seu anúncio sera publicado, ai é só ser
                feliz!
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export default Cadastro_Anuncio;
