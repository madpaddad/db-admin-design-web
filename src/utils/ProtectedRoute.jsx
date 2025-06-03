import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  
  // Check if token exists and is not expired
  const isAuthenticated = token && tokenExpiration && Date.now() < parseInt(tokenExpiration);
  
  if (!isAuthenticated) {
    // Redirect to login page with the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;