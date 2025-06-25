import React from "react";
import { useLocation } from "react-router-dom";

const Teste = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const carTitle = params.get("id");

  return (
    <div>
      <h1>Detalhes do Carro</h1>
      <p>Você selecionou o carro: {carTitle}</p>
    </div>
  );
};

export default Teste;