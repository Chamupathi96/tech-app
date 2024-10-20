// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { APPContext } from '../context/AppContext'; // Import the context

const MyProfile = () => {
  const navigate = useNavigate();
  const { logout } = useContext(APPContext); // Use the context

 

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/'); // Navigate to Home after logout
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 h-screen">
      {/* Profile Header */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-6 flex items-center justify-between">
        {/* Profile Icon */}
        <div className="flex items-center space-x-4">
          <img src={assets.profile_icon} alt="Profile Icon" className="w-12 h-12 rounded-full" />
          <h2 className="text-xl font-semibold">Welcome, User!</h2>
        </div>
        {/* Basket Icon */}
        <img 
          src={assets.bag_icon} 
          alt="Basket Icon" 
          className="w-8 h-8 cursor-pointer" 
           // Navigate to MyOrders page on click
        />
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300">
        Logout
      </button>
    </div>
  );
};

export default MyProfile;