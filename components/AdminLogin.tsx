import React, { useState } from 'react';
import { apiService } from '../utils/apiService';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await apiService.login(credentials.username, credentials.password);
      
      if (response.success) {
        onLogin();
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-lightGrey1 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-hondaRed text-white p-8 rounded-t-lg text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Admin Portal</h2>
          <p className="text-red-100 mt-2">Kanade Honda Management System</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-jetBlack mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-lightGrey2 rounded-sm focus:outline-none focus:border-hondaRed focus:ring-1 focus:ring-hondaRed transition-colors"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-jetBlack mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-lightGrey2 rounded-sm focus:outline-none focus:border-hondaRed focus:ring-1 focus:ring-hondaRed transition-colors"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 font-bold rounded-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
              isLoading 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-hondaRed text-white hover:bg-red-700 hover:scale-105 active:scale-95'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                LOGGING IN...
              </>
            ) : (
              'LOGIN'
            )}
          </button>

          <div className="bg-lightGrey1 p-4 rounded-sm text-center">
            <p className="text-sm text-charcoalGrey mb-2">Default Credentials:</p>
            <p className="text-xs text-charcoalGrey">Username: <strong>admin</strong></p>
            <p className="text-xs text-charcoalGrey">Password: <strong>kanade123</strong></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;