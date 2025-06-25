import styles from "./Header_Home_Login.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import { LogOutIcon, User } from "lucide-react";
import Swal from "sweetalert2";

function Header_Home_Login() {
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      icon: "question",
      text: "Deseja realmente sair da conta?",
      showCancelButton: true,
      cancelButtonText: "Não",
      confirmButtonText: "Sim",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/Login");
      }
    });
  };

  const linkClass = ({ isActive }) => (isActive ? styles.first : "");

  return (
    <header style={{borderBottom: "solid 1px #8080803d"}}>
      <div>
        <h1 className={styles.h1}>Mauro Motors</h1>
      </div>

      <div className={styles.Links}>
        <NavLink to="/home" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/veiculos" className={linkClass}>
          Veículos
        </NavLink>
        <NavLink to="/anunciar-veiculo" className={linkClass}>
          Anunciar
        </NavLink>
        <NavLink to="/avaliacoes" className={linkClass}>
          Avaliações
        </NavLink>
      </div>

      <div className={styles.userSection} >
        <NavLink to="/perfil" className={linkClass}>
          <User
            className={styles.icon}
            size={36}
          />
        </NavLink>
        <div className={styles.logoutIcon} onClick={logout}>
          <LogOutIcon
            size={32}
            color={"gray"}
          />
        </div>
      </div>
    </header>
  );
}

export default Header_Home_Login;
