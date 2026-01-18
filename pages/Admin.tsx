import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from './AdminDashboard';
import { apiService } from '../utils/apiService';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    setIsAuthenticated(apiService.isAuthenticated());
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    apiService.logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div>
      {/* Logout Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-hondaRed text-white px-4 py-2 rounded-sm font-semibold hover:bg-red-700 transition-colors shadow-lg"
        >
          Logout
        </button>
      </div>
      
      <AdminDashboard />
    </div>
  );
};

export default Admin;