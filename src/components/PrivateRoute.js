import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { message } from 'antd';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      message.error('Please log in first.');
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return isAuthenticated ? children :
   <Navigate to="/" />
};

export default PrivateRoute;
