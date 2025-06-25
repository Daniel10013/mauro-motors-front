import "./Quiz.css";
import Header_Home_Login from "../../Components/Header_Home_Login"
import image from "./image/image.png";
import { useEffect, useState } from "react";
import Select from 'react-select';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const engineDisplacementOptions = [
  { value: '1.0L', label: '1.0 L' },
  { value: '1.0L - 2.0L', label: '1.0 L – 2.0 L' },
  { value: '2.0L and above', label: 'Acima de 2.0 L' },
];

const engineTypeOptions = [
  { value: 'gasoline', label: 'Gasolina' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Elétrico' },
  { value: 'hybrid', label: 'Híbrido' },
];

const carSizeOptions = [
  { value: 'hatch', label: 'Hatch' },
  { value: 'coupe', label: 'Cupê' },
  { value: 'suv', label: 'SUV' },
  { value: 'offroad', label: 'Off‑road' },
  { value: 'sedan', label: 'Sedã' },
];

const priceRangeOptions = [
  { value: 'up to 50k', label: 'Até 50 mil' },
  { value: '50k to 100k', label: '50 mil – 100 mil' },
  { value: '100k to 150k', label: '100 mil – 150 mil' },
  { value: '150k and above', label: 'Acima de 150 mil' },
];

function Quiz() {

  const navigate = useNavigate();
  
  const [cilindradas, setCilindradas] = useState("");
  const [tipoMotor, setTipoMotor] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [preco, setPreco] = useState("");
  const [respondeuQuizz, setRespondeuQuizz] = useState(false);

  useEffect(() => {
    axios.get(apiUrl + "check-quizz", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      if (res.data.status == "success") {
        setRespondeuQuizz(res.data.data);
      }
    });
  }, []);

  const handleCilindradas = (e) => {
    setCilindradas(e.value);
  }
  const handleTipoMotor = (e) => {
    setTipoMotor(e.value)
  }
  const handleTamanho = (e) => {
    setTamanho(e.value)
  }
  const handlePreco = (e) => {
    setPreco(e.value);
  }

  const saveQuizz = (e) => {
    e.preventDefault();
    if (
      !cilindradas ||
      !tipoMotor ||
      !tamanho ||
      !preco
    ) {
      Swal.fire({
        "title": "Erro",
        "icon": "error",
        "text": "Selecione todas as opções corretamente!"
      });
      return;
    }

    const body = {
      engine_displacement: cilindradas,
      engine_type: tipoMotor,
      car_size: tamanho,
      price_range: preco
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    if (respondeuQuizz == true) {
      axios.put(apiUrl + "quizz", body, {headers})
      .then((res)=> {
        console.log(res.data);
        if(res.data.status == "success"){
          responseAlert(res.data.message, "success");
        }
      })
      .catch((res) => {
        responseAlert(res.data.message, "error");
      });
    } else {
      axios.post(apiUrl + "quizz", body, {headers})
      .then((res)=> {
        console.log(res.data);  
        if(res.data.status == "success"){
          responseAlert(res.data.message, "success");
        }
      })
      .catch((res) => {
        responseAlert(res.data.message, "error");
      });
    }
  }

  const responseAlert = (msg, status) => {
    const tittle = status == "error" ? "Erro" : "Sucesso"
      Swal.fire({
        "title": tittle,
        "icon": status,
        "text": msg
      }).then(() => {
        if(status == "success"){
          navigate("/resultado-quizz");
        }
      });
  }

  return (
    <div>
      <Header_Home_Login />
      <div className="quizPage">
        <h1>Encontre o melhor carro para você</h1>
        <p>
          Nos conte suas preferencias e nos fazemos o trabalho para te trazer as
          melhores escolhas!
        </p>
        <div className="divisionArea">
          <div className="divArea">
            <h1>Como funciona?</h1>
            <p>
              Tudo que você precisa fazer é responder nosso questionário rápido
              com algumas perguntinhas simples.
            </p>
            <p>
              A partir dai nosso sistema vai encontrar os melhores carros para
              que você possa realizar suas compras sem dificuldade!
            </p>
            <p>
              Após o nosso algoritimo processar suas escolhas, ele vai exibir os
              carros de acordo com o que mais encaixa e entregar na sua mão!
            </p>

            <img className="imgQuiz" src={image} alt="" />
          </div>
          <div className="divArea" id="borderDiv">
            <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <label>Cilindradas do motor</label>
              <Select
                options={engineDisplacementOptions}
                className="quizzSelect"
                placeholder="Selecione as cilindradas do motor"
                onChange={handleCilindradas}
              />

              <label>Tipo do motor</label>
              <Select
                options={engineTypeOptions}
                className="quizzSelect"
                placeholder="Selecione o tipo do motor"
                onChange={handleTipoMotor}
              />

              <label>Tamanho do carro</label>
              <Select
                options={carSizeOptions}
                className="quizzSelect"
                placeholder="Selecione um tamanho"
                onChange={handleTamanho}
              />

              <label>Faixa de preço</label>
              <Select
                options={priceRangeOptions}
                className="quizzSelect"
                placeholder="Selecione uma faixa preço"
                onChange={handlePreco}
              />

              <button type="submit" className="btn-buscar" onClick={saveQuizz}>
                Buscar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
