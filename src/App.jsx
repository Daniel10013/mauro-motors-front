import HomeSemLogin from "./Pages/HomeSLogin_Login_Registrar/HomeSLogin_Login_Registrar";
import CadastroAnuncio from "./Pages/Cadastro_Anuncio/Cadastro_Anuncio";
import DetalhesAnuncio from "./Pages/DetalhesAnuncio/DetalhesAnuncio";
import ResultadoQuizz from "./Pages/ResultadoDoQuizz/ResultadoQuizz";
import ListagemAnuncios from "./Pages/ListagemAnuncios/Hero/Hero";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import CreateReview from "./Pages/CreateReview/CreateReview";
import HomeComLogin from "./Pages/Home_ComLogin/index";
import DetailsReview from "./Pages/DetalhesAvaliacao";
import Avaliacao from "./Pages/Avaliacao/Avaliacao";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Components/Login/Login";
import Perfil from "./Pages/Perfil/Perfil";
import Quizz from "./Pages/Quiz/Quiz";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeSemLogin />} />
        <Route path="/login" element={<Login />} />
        {/* Rota protegida, adicionar todas as rotas que precisam de login aqui */}
        <Route element={<PrivateRoute />}>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/home" element={<HomeComLogin />} />
          <Route path="/anunciar-veiculo" element={<CadastroAnuncio />} />
          <Route path="/quizz" element={<Quizz />} />
          <Route path="/veiculos" element={<ListagemAnuncios />} />
          <Route path="/anuncio/:id" element={<DetalhesAnuncio />} />
          <Route path="/avaliacoes" element={<Avaliacao />} />
          <Route path="/avaliacao/:id" element={<DetailsReview />} />
          <Route path="/postar-avaliacao" element={<CreateReview />} />
          <Route path="/resultado-quizz" element={<ResultadoQuizz />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>

  );
};

export default App;
