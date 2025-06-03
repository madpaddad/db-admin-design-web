import React from 'react';

import { useNavigate } from 'react-router-dom';
export default function Logout(){

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure about logging out?');
    if (confirmed) {
      localStorage.removeItem('accessToken');
      navigate('/');
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Logout</h1>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex space-x-4">
                <button 
                    onClick={handleLogout} 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Log Out
                </button>
                <button 
                    onClick={() => navigate(-1)} 
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

