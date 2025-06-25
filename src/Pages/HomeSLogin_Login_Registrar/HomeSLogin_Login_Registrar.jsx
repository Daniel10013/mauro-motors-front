import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar";
import Hero from '../../Components/Hero/Hero';
import Vantagens from '../../Components/Vantagens/Vantagens';
import Title from '../../Components/Title/Title';
import Sobre from '../../Components/Sobre/Sobre';
import Contato from '../../Components/Contato/Contato';
import Footer from '../../Components/Footer/Footer';
import Login from '../../Components/Login/Login';

const HomeSLogin_Login_Registrar = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Navbar />}
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <div className="container">
                <Title title="Quem Somos?" />
                <Sobre />
                <div style={{padding: "50px 0px", background: "rgba(217, 217, 217, 0.23)"}}>
                  <Title title="Veja as vantagens de usar nosso site!" />
                  <Vantagens />
                </div>
                <Title title="Se interessou pelo nosso trabalho?" />
                <Contato />
                <Footer />
              </div>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>

      
     
    </>
  );
};

export default HomeSLogin_Login_Registrar;
