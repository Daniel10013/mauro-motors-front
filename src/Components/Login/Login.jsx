import { data, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import React, { useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

function Login() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senhaErro, setSenhaErro] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");


  const handleNomeChange = (e) => {
    const novoNome = e.target.value;
    setNome(novoNome);
  };

  const handleEmailChange = (e) => {
    const novoEmail = e.target.value;
    setEmail(novoEmail);
  };

  const handleDataChange = (e) => {
    const novaData = e.target.value;
    setDataNascimento(novaData);
  };

  const aplicarMascaraCPF = (valor) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{2})$/, "$1-$2");
  };

  const aplicarMascaraCEP = (valor) => {
    return valor.replace(/\D/g, "").replace(/(\d{5})(\d{3})$/, "$1-$2");
  };

  const aplicarMascaraTelefone = (valor) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;

    return true;
  };

  const handleCPFChange = (e) => {
    const valorFormatado = aplicarMascaraCPF(e.target.value);
    setCpf(valorFormatado);
    if (valorFormatado.length === 14 && !validarCPF(valorFormatado)) {
      setError("CPF inválido");
    } else {
      setError("");
    }
  };

  const handleCEPChange = (e) => {
    const valorFormatado = aplicarMascaraCEP(e.target.value);
    setCep(valorFormatado);
  };

  const handleTelefoneChange = (e) => {
    const valorFormatado = aplicarMascaraTelefone(e.target.value);
    setTelefone(valorFormatado);
  };

  const handleSenhaChange = (e) => {
    const novaSenha = e.target.value;
    setSenha(novaSenha);
    validarSenhas(novaSenha, confirmarSenha);
  };

  const handleConfirmarSenhaChange = (e) => {
    const novaConfirmarSenha = e.target.value;
    setConfirmarSenha(novaConfirmarSenha);
    validarSenhas(senha, novaConfirmarSenha);
  };

  const validarSenhas = (senha, confirmarSenha) => {
    if (senha !== confirmarSenha) {
      setSenhaErro("As senhas não coincidem.");
    } else {
      setSenhaErro("");
    }
  };  

  const cepToSave = (cep) => {
    return cep.replace(/\D/g, '');
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

  return (
    <body className={styles.bodyLogin}>
      <div
        className={`${styles.contentLogin} ${
          isRightPanelActive ? styles["right-panel-active"] : ""
        }`}
        id="content"
      >
        <div
          className={`${styles["form-content"]} ${styles["sign-up-content"]}`}
        >
          <form action="#" className={styles.formLogin}>
            <h1 className={styles.h1Login}>Seja bem vindo!</h1>
            <span className={styles.spanLogin}>
              Preencha seus dados para começar a olhar veículos hoje mesmo!
            </span>

            <div className={styles.infield}>
              <input
                className={styles.inputLogin}
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={handleNomeChange}
              />
            </div>

            <div className={styles.infield}>
              <input
                className={styles.inputLogin}
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className={styles.infield}>
              <input
                className={styles.inputLogin}
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={handleSenhaChange}
              />
            </div>

            <div className={styles.infield}>
              <input
                className={styles.inputLogin}
                type="password"
                placeholder="Confirmar Senha"
                value={confirmarSenha}
                onChange={handleConfirmarSenhaChange}
              />
              {senhaErro && <span style={{ color: "red" }}>{senhaErro}</span>}
            </div>

            <div className={styles.infield}>
              <input
                className={styles.inputLogin}
                type="date"
                placeholder="Data de Nascimento"
                value={dataNascimento}
                onChange={handleDataChange}
              />
            </div>

            <div className={styles.infield}>
              <input
                className={styles.inputLogin}
                type="text"
                value={cpf}
                onChange={handleCPFChange}
                placeholder="CPF"
                maxLength="14"
              />
              {error && <span style={{ color: "red" }}>{error}</span>}
            </div>

            <div className={styles.infield}>
              <input
                className={styles.inputLogin}
                type="text"
                value={cep}
                onChange={handleCEPChange}
                placeholder="CEP"
                maxLength="9"
              />
            </div>

            <div className={styles.infield}>
              <input
                className={styles.inputLogin}
                type="text"
                value={telefone}
                onChange={handleTelefoneChange}
                placeholder="Telefone"
                maxLength="15"
              />
            </div>

            <button
              className={styles.buttonLogin}
              onClick={(e) => {
                e.preventDefault();
                if (
                  !nome ||
                  !email ||
                  !dataNascimento ||
                  !cpf ||
                  !cep ||
                  !telefone ||
                  !senha ||
                  !confirmarSenha ||
                  senhaErro ||
                  !validarCPF(cpf)
                ) {
                  Swal.fire({
                    title: "Erro",
                    text: "Por favor, preencha todos os campos corretamente para registrar!",
                    icon: "error"
                  });
                  return;
                }

                if(passwordIsStrong(senha) == false){
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
                      </div>
                    `,
                    confirmButtonText: 'Entendi'
                  });
                  return;
                }
                const dataToRegistrate = {
                  "name": nome,
                  "email": email,
                  "password": senha,
                  "cpf": cpf,
                  "birth_date": dataNascimento,
                  "cep": cepToSave(cep),
                  "phone": telefone
                }
                
                setIsLoading(true);
                axios.post(apiUrl + "users", dataToRegistrate).then((response) => {
                  if(response.data.status == "success"){
                    Swal.fire({
                      text: "Usuário criado com sucesso!",
                      icon: "success"
                    }).then((res) => {
                      localStorage.setItem('token', response.data.token);
                      navigate("/home");
                    });
                  }
                }).catch((error) => {
                  if (error.response?.status === 401) {
                      setIsLoading(false)
                      Swal.fire({
                        title: "Erro",
                        text: "Dados invalidos para criação do usuário!",
                        icon: "error"
                      });
                  }
                })
              }}
            >
              {isLoading ? <div className={styles.loader}></div> : "Registrar"}
            </button>
          </form>
        </div>

        <div
          className={`${styles["form-content"]} ${styles["sign-in-content"]}`}
        >
          <form action="#" className={styles.formLogin}>
            <h1 className={styles.h1Login}>Login</h1>
            <div className={styles["social-content"]}></div>

            <div className={styles.infield}>
              <input
                className={styles.inputLogin}
                type="email"
                placeholder="Email"
                name="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div className={styles.infield}>
              <input
                className={styles.inputLogin}
                type="password"
                placeholder="Senha"
                value={loginSenha}
                onChange={(e) => setLoginSenha(e.target.value)}
              />
            </div>

            <a href="#" className={styles.forgot}>
              Esqueceu a senha?
            </a>

            <button
              className={styles.buttonLogin}
              onClick={(e) => {
                e.preventDefault();
                if (!loginEmail || !loginSenha) {
                  Swal.fire({
                    title: "Erro",
                    text: "Preencha todos os campos!",
                    icon: "error"
                  });
                  return;
                }
                
                let dataToSend = {
                  "email": loginEmail,
	                "password": loginSenha
                }
                setIsLoading(true);
                
                axios.post(apiUrl + "auth", dataToSend).then((response) => {
                  if(response.data.status == "success"){
                    console.log(response);
                    localStorage.setItem('token', response.data.token);
                    navigate("/home");
                  }
                }).catch((error) => {
                  console.error(error);
                  if (error.response?.status === 401) {
                      setIsLoading(false);
                      Swal.fire({
                        title: "Erro",
                        text: "Usuário ou senha incorretos!",
                        icon: "error"
                      });
                  }
                })
              }}  
            >
              {isLoading ? <div className={styles.loader}></div> : "Login"}
            </button>
          </form>
        </div>

        <div className={styles["overlay-content"]} id="overlayCon">
          <div className={styles.overlay}>
            <div
              className={styles["overlay-panel"] + " " + styles["overlay-left"]}
            >
              <h1 className={styles.h1Login}>Bem vindo!</h1>
              <p className={styles.pLogin}>
                O lugar certo para o encontro de seu novo carro!
              </p>
              <button
                className={styles.buttonLogin}
                onClick={() => setIsRightPanelActive(false)}
              >
                Login
              </button>
            </div>
            <div
              className={
                styles["overlay-panel"] + " " + styles["overlay-right"]
              }
            >
              <h1 className={styles.h1Login}>Bem vindo de volta!</h1>
              <p className={styles.pLogin}>
                Caso ainda não tenha login no site, registre-se já.
              </p>
              <button
                className={styles.buttonLogin}
                onClick={() => setIsRightPanelActive(true)}
              >
                Registro
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
