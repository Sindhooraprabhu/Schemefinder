// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Adjust path if necessary

const PrivateRoute = () => {
    const { auth } = useAuth();
    
    // Renders the child route (DashboardWrapper) if authenticated; otherwise, redirects to /login.
    return auth && auth.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;