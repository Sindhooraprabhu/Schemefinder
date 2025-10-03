import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import FarmersDashbord from './FarmersDashboard';
import EntrepreneursDashbord from './EntrepreneursDashboard';
import AppNavbar from '../components/Navbar';

const DashboardWrapper = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Get the role from localStorage

    if (!token || !role) {
      navigate('/login');
    } else {
      try {
        const role = localStorage.getItem("role");
           setUserRole(role);

      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login');
      }
    }
  }, [navigate]);

  if (!userRole) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      
      {userRole === 'farmer' ? <FarmersDashbord /> : <EntrepreneursDashbord />}
    </>
  );
};

export default DashboardWrapper;