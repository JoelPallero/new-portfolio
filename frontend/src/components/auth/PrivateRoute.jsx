import { Navigate } from 'react-router-dom';

// Verifica si el usuario está autenticado
const isAuthenticated = () => {  
  return !!localStorage.getItem('authToken');
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/public/login" />;
};

export default PrivateRoute;