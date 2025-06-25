import { Navigate, Outlet, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

function isTokenExpired(token) {
  try {
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp < now;
  } catch (e) {
    return true;
  }
}

export default function PrivateRoute() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
  if (isTokenExpired(token)) {
    localStorage.removeItem('token');
    Swal.fire({
      "title": "Login Expirado",
      "text": "Seu login expirou, por favor faça login novamente!",
      "icon": "warning",
      "showConfirmButton": true
    }).then(() => {
      navigate('./login')
    })
  }

  return <Outlet />;
}