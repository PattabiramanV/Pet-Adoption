import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './components/Loader/Loader';

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (token) {
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
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [token]);

  if (loading) {
    return <Loader></Loader> // Or you can use your custom loader component
  }

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
