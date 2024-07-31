// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//     const token = localStorage.getItem('token');
//     return token ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;



import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './components/Loader/Loader';


const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ROUTERVALIDATION_BASE_URL}validtoken.php`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.message === "Access denied. Invalid token.") {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <Loader></Loader> // Or you can use your custom loader component

  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
