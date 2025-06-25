import ListaDeDesejos from "../../Components/ListaDesejos/ListaDesejos";
import { data, useNavigate, useSearchParams } from "react-router-dom";
import Header_Home_Login from "../../Components/Header_Home_Login"
import AnunciosUsuario from "../../Components/UserAds/UserAds";
import React, { useState, useEffect } from "react"; // Import useState
import userAvatar from "./images/user-avatar.png";
import Loader from "../../Components/Loader";
import styles from "./Perfil.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import VendasUsuario from "../../Components/UserSells/UserSells";
import ComprasUsuario from "../../Components/UserBuys/UserBuys";


const apiUrl = import.meta.env.VITE_API_URL;
const uploadImageUrl = import.meta.env.VITE_IMAGE_API_URL;
const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`
};

const Perfil = () => {


  const navigate = useNavigate();
  
  const [headers, setHeaders] = useState();
  const [isLoading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') || 'editProfile'
  );

  const [userData, setUserData] = useState({});
  const [userImage, setUserImage] = useState(null);

  //vem do banco
  const [address, setAddress] = useState({});
  //vem da api viacep
  const [addressFromCep, setAddressFromCep] = useState({});
  //usado para controlar os inputs
  const [cepInput, setCepInput] = useState('');
  const [addressNumber, setAddressNumber] = useState();

  //dados da conta, para atualizar
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [actualPassword, setActualPassword] = useState("");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([
        setUser(),
        getAddress()
      ]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  const setUser = async () => {
    return axios.get(apiUrl + "user", {headers: getAuthHeaders()})
      .then((res) => {
        if (res.data.status == "success") {
          setUserData(res.data.data[0]);
          return getUserImage();
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Erro",
          icon: "error",
          text: "Erro ao carregar dados do perfil!"
        }).then(() => {
          navigate("/home");
        })
      })
  }

  const getUserImage = async () => {
    return axios.get(apiUrl + "user-image", {headers: getAuthHeaders()})
      .then((res) => {
        if (res.data.status == "success") {
          const image = res.data.data.length == 0 ? null : res.data.data[0].file_name;
          setUserImage(image);
        }
      })
      .catch((err) => {
        console.log(err, 2);
        Swal.fire({
          title: "Erro",
          icon: "error",
          text: "Erro ao carregar imagem do perfil!"
        }).then(() => {
          navigate("/home");
        })
      })
  }

  const getAddress = async () => {
    return axios.get(apiUrl + "get-address-by-id", {headers: getAuthHeaders()})
      .then((res) => {
        if (res.data.status == "success") {
          setAddress(res.data.data[0]);
          checkAddress(res.data.data[0]);
          return setFromCep(res.data.data[0].zip_code);
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Erro",
          icon: "error",
          text: "Erro ao carregar endereço do perfil!"
        }).then(() => {
          navigate("/home");
        })
      })
  }

  const setFromCep = (cep) => {
    if (!cep) {
      setAddressFromCep({});
      return;
    }
    axios.get(`https://viacep.com.br/ws/${somenteNumeros(cep)}/json/`)
      .then((res) => {
        setCepInput(cep);
        setAddressFromCep(res.data);
      })
      .catch(() => {
        Swal.fire({
          title: "Erro",
          text: "CEP inválido!",
          icon: "error"
        })
      })
  }

  const somenteNumeros = (str) => {
    return String(str).replace(/\D/g, '');
  }

  const updateAddress = () => {
    if (!cepInput || !addressNumber) {
      Swal.fire({
        title: "Erro",
        text: "Preencha os campos do endereço corretamente",
        icon: "error"
      })
      return;
    }

    const addressToUpdate = {
      "zip_code": cepInput,
      "address_number": addressNumber,
      "street": addressFromCep.logradouro,
      "estate": addressFromCep.uf,
      "city": addressFromCep.localidade,
      "neighborhood": addressFromCep.bairro
    }

    return axios.put(apiUrl + "address", addressToUpdate, {headers: getAuthHeaders() })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "success") {
          setAddress(addressToUpdate);
          Swal.fire({
            icon: "success",
            text: "Endereço atualizado!"
          });
        }
      })
  }

  const checkAddress = (dataAddress) => {
    const isToShow = !dataAddress.city || !dataAddress.address_number || !dataAddress.estate || !dataAddress.neighborhood || !dataAddress.street;
    if (isToShow == true) {
      Swal.fire({
        title: "Confira o endereço!",
        icon: "warning",
        text: "Preencha o endereço para melhor uso do site!"
      });
    }
  }

  const formatValue = (value) => {
    return value == null ? "-" : value;
  }

  const [timeoutId, setTimeoutId] = useState(null);
  const handleCepChange = (e) => {
    const value = e.target.value;
    setCepInput(value);

    if (timeoutId) clearTimeout(timeoutId);

    const id = setTimeout(() => {
      setFromCep(value);
    }, 1000);

    setTimeoutId(id);
  };

  const updateProfile = () => {
    if (!newEmail || !actualPassword) {
      Swal.fire({
        title: "Erro!",
        icon: "error",
        text: "Preencha todos os campos para atualizar a conta!"
      });
      return;
    }

    if (newPassword != newPasswordConfirm) {
      Swal.fire({
        title: "Erro!",
        icon: "error",
        text: "Os dois campos de 'nova senha' devem ser iguais!"
      });
      return;
    }

    if (!newPassword == false && passwordIsStrong(newPassword) == false) {
      Swal.fire({
        icon: 'error',
        title: 'Senha fraca',
        html: ` 
          <h3 stlye="text-align: left;margin-left: 30px;">A senha deve conter:</h3>
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <ul style="text-align: left; margin-top: 10px;">
              <li>No mínimo 8 caracteres</li>
              <li>Pelo menos 1 letra maiúscula</li>
              <li>Pelo menos 1 número</li>
              <li>Pelo menos 1 caractere especial (!@#$...)</li>
            </ul>
          </div>`,
        confirmButtonText: 'Entendi'
      });
      return;
    }

    const dataToUpdate = {
      email: newEmail,
      password: actualPassword,
      new_password: newPassword
    };
    console.log(dataToUpdate);
    axios.put(apiUrl + "update-user", dataToUpdate, {headers: getAuthHeaders() })
    .then((res) => {
        console.log(res);
        if(res.data.status == "success"){
          Swal.fire({
            title: "Perfil atualizado!",
            icon: "success",
            text: "Dados atualizados com sucesso!"
          }).then(()=>{
            window.location.reload();
          })
        }
    })
    .catch((err)=>{
      Swal.fire({
        title: "Erro!",
        icon: "error",
        text: err.response.data.message
      })
    })
  }

  const passwordIsStrong = (password) => {
    if (password.length < 8) {
      return false;
    }
    if (!/[!@#$%^&*()\-=+{};:,<.>]/.test(password)) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/[0-9]/.test(password)) {
      return false;
    }
    return true;
  }

  const showImageInputAlert = () => {
    Swal.fire({
      title: 'Selecione a imagem',
      html: `
      <div style="display: flex; align-items: center; justify-content: center; gap: 10px; flex-direction: column;">
        <input type="file" id="imageInput" accept="image/*" />
        <img id="previewImage" src="" style="margin-top: 10px; max-width: 50%; display: none;" />
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      preConfirm: () => {
        const fileInput = Swal.getPopup().querySelector('#imageInput');
        const file = fileInput.files[0];
        if (!file) {
          Swal.showValidationMessage('Você precisa selecionar uma imagem');
        }
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          Swal.showValidationMessage('Tipo de imagem inválido. Use PNG, JPG, JPEG ou WEBP');
          return;
        }
        return file;
      },
      didOpen: () => {
        const input = document.getElementById('imageInput');
        const preview = document.getElementById('previewImage');

        input.addEventListener('change', () => {
          const file = input.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = e => {
              preview.src = e.target.result;
              preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
          } else {
            preview.style.display = 'none';
          }
        });
      }
    }).then(result => {
      if (result.isConfirmed) {
        Swal.showLoading();
        const imageFile = result.value;
        return uploadImage(imageFile);
      }
    });
  };

  const saveImage = (imageUrl) => {
    const jsonToSave = {
	    "file_name": imageUrl
    }
    console.log(jsonToSave);
    if(userImage == null){
      axios.post(apiUrl + "profile-photo", jsonToSave, {headers: getAuthHeaders() })
      .then((res) => {
          if(res.data.status == "success"){
            Swal.close();
            Swal.fire({
              icon: "success",
              text: "Imagem salva com sucesso!"
            });
          }
          setUserImage(imageUrl);
      })
    }else{
      axios.put(apiUrl + "profile-photo", jsonToSave, {headers: getAuthHeaders() })
      .then((res) => {
          if(res.data.status == "success"){
            Swal.close();
            Swal.fire({
              icon: "success",
              text: "Imagem atualizada com sucesso!"
            });
            setUserImage(imageUrl);
          }
      })
    }

  }

  const uploadImage = (image) => {
    const formData = new FormData();
    formData.append("image", image);
    axios.post(uploadImageUrl, formData)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          return saveImage(res.data.data.display_url);
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
  if (isLoading) return <Loader />;
  return (
    <>
      <Header_Home_Login />
      <main className={styles.mainContent}>
        <div className={styles.profileSummary}>
          <div className={styles.avatarSection} style={{ width: "23%" }}>
            <span className={styles.changePhoto} onClick={showImageInputAlert} >Trocar Imagem</span>
            <div className={styles.avatar}>
              <img
                src={userImage == null ? userAvatar : userImage}
                alt="User Avatar"
                className={styles.avatarImage}
              />{" "}
            </div>
            <h1>{userData.name}</h1>
          </div>

          {/* Dados do mano  */}
          <div className={`${styles.dataCard} ${styles.personalDataCard}`} style={{ border: "solid 1px #b9b9b95e" }} >
            <h3>Dados Pessoais</h3>
            <div className={styles.cardRow}>
              <div className={styles.cardItem}>
                <span className={styles.label}>Nome</span>
                <span className={styles.value}>{userData.name}</span>
              </div>
              <div className={styles.cardItem}>
                <span className={styles.label}>Telefone</span>
                <span className={styles.value}>{userData.phone}</span>
              </div>
            </div>
            <div className={styles.cardRow}>
              <div className={styles.cardItem}>
                <span className={styles.label}>Data de Nascimento</span>
                <span className={styles.value}>{userData.birth_date}</span>
              </div>
              <div className={styles.cardItem}>
                <span className={styles.label}>CPF</span>
                <span className={styles.value}>{userData.cpf}</span>
              </div>
            </div>
            <div className={styles.cardRow}>
              <div className={styles.cardItem}>
                <span className={styles.label}>E-mail</span>
                <span className={styles.value}>{userData.email}</span>
              </div>
            </div>
          </div>

          {/* Endereço do mano*/}
          <div className={`${styles.dataCard} ${styles.addressCard}`} style={{ border: "solid 1px #b9b9b95e" }} >
            <h3>Endereço</h3>
            <div className={styles.cardRow}>
              <div className={styles.cardItem}>
                <span className={styles.label}>Rua</span>
                <span className={styles.value}>{formatValue(address.street)}</span>
              </div>
              <div className={styles.cardItem}>
                <span className={styles.label}>Cidade</span>
                <span className={styles.value}>{formatValue(address.city)}</span>
              </div>
            </div>
            <div className={styles.cardRow}>
              <div className={styles.cardItem}>
                <span className={styles.label}>Número</span>
                <span className={styles.value}>{formatValue(address.address_number)}</span>
              </div>
              <div className={styles.cardItem}>
                <span className={styles.label}>Estado</span>
                <span className={styles.value}>{formatValue(address.city)}</span>
              </div>
            </div>
            <div className={styles.cardRow}>
              <div className={styles.cardItem}>
                <span className={styles.label}>Bairro</span>
                <span className={styles.value}>{formatValue(address.neighborhood)}</span>
              </div>
              <div className={styles.cardItem}>
                <span className={styles.label}>CEP</span>
                <span className={styles.value}>{formatValue(address.zip_code)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Menu do perfil */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === "editProfile" ? styles.activeTab : ""
              }`}
            onClick={() => handleTabClick("editProfile")}
          >
            Editar Perfil
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "listaDeDesejos" ? styles.activeTab : ""
              }`}
            onClick={() => handleTabClick("listaDeDesejos")}
          >
            Lista de Desejos
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "myAds" ? styles.activeTab : ""
              }`}
            onClick={() => handleTabClick("myAds")}
          >
            Meus Anúncios
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "mySales" ? styles.activeTab : ""
              }`}
            onClick={() => handleTabClick("mySales")}
          >
            Minhas Vendas
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "myPurchases" ? styles.activeTab : ""
              }`}
            onClick={() => handleTabClick("myPurchases")}
          >
            Minhas Compras
          </button>
        </div>
        {/* Seções de menu do Perfil */}
        {activeTab === "editProfile" && (
          <>
            {" "}
            {/* Editar Perfil */}
            <section className={styles.editProfileSection}>
              <h2>Dados da Conta</h2>
              <span style={{fontSize: "14px", color: "gray", marginTop: "-5px"}}>Caso não queira atualizar a senha, basta deixar os campos de "nova senha" em branco</span>
              <div className={styles.formGrid} style={{marginTop: "10px"}}>
                <div className={styles.formGroup}>
                  <label htmlFor="newEmail">Digite o novo e-mail</label>
                  <input type="email" id="newEmail" value={newEmail} onChange={(e) => { setNewEmail(e.target.value) }} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="confirmNewPassword">
                    Confirme a nova senha
                  </label>
                  <input type="password" id="confirmNewPassword" value={newPasswordConfirm} onChange={(e) => { setNewPasswordConfirm(e.target.value) }} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="newPassword">Digite uma nova senha</label>
                  <input type="password" id="newPassword" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="currentPassword">
                    Confirme a senha atual para salvar os dados
                  </label>
                  <input type="password" id="currentPassword" value={actualPassword} onChange={(e) => { setActualPassword(e.target.value) }} />
                </div>
              </div>
              <button className={styles.actionButton} style={{ color: "white" }} onClick={updateProfile} >Alterar perfil</button>
            </section>
            {/* Telecos adicionais */}
            <section className={styles.additionalInfoSection}>
              {/* Altera o endereço */}
              <div className={styles.addresses}>
                <h2>Endereço</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="cep">CEP</label>
                    <input type="text" id="cep" value={cepInput} onInput={handleCepChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="number">Número</label>
                    <input type="text" id="number" value={!address.address_number ? addressNumber : address.address_number} onInput={(e) => { setAddressNumber(e.target.value) }} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="state">Estado</label>
                    <input type="text" id="state" disabled value={!addressFromCep ? "" : addressFromCep.uf} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="district">Bairro</label>
                    <input type="text" id="district" disabled value={!addressFromCep ? "" : addressFromCep.bairro} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="city">Cidade</label>
                    <input type="text" id="city" disabled value={!addressFromCep ? "" : addressFromCep.localidade} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="street">Rua</label>
                    <input type="text" id="street" disabled value={!addressFromCep ? "" : addressFromCep.logradouro} />
                  </div>
                </div>
                <button className={styles.actionButton} style={{ color: "white" }} onClick={updateAddress} >
                  Alterar endereço
                </button>
              </div>
            </section>
          </>
        )}
        {/* Pro codigo não ficar gigante coloquei os outros trem do menu em componets (ALTO NIVEl) */}
        {activeTab === "listaDeDesejos" && <ListaDeDesejos />}{" "}
        {/*Meus anuncios */}
        {activeTab === "myAds" && <AnunciosUsuario />}{" "}
        {/*Minhas vendas */}
        {activeTab === "mySales" && <VendasUsuario />}{" "}
        {/*Minhas Compras */}
        {activeTab === "myPurchases" && <ComprasUsuario />}{" "}
      </main>
    </>
  );
};

export default Perfil;
