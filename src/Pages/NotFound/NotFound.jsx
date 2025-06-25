import { useNavigate, Link } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>404 - Página não encontrada</h1>
            <p>A página que você tentou acessar não existe.</p>
            <Link to={'/home'} style={{textDecoration: "underline"}}>
                Voltar para a Home
            </Link>
        </div>
    );
}

export default NotFound;
