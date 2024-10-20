// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { APPContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token } = useContext(APPContext); // Get the token from context

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li className='py-1'>Home</li>
        </NavLink>
        <NavLink to='/menu'>
          <li className='py-1'>Menu</li>
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>About</li>
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>Contact</li>
        </NavLink>
      </ul>
      <div className='flex items-center gap-20'>
        <NavLink to='/cart'>
          <li className='w-6'><img src={assets.basket_icon} alt="" /></li>
        </NavLink>
        {
          token ? ( // Check if token exists to determine if user is logged in
            <div>
              <img
                className='w-8 rounded-full cursor-pointer'
                src={assets.profile_icon}
                alt="Profile Icon"
                onClick={() => navigate('/my-profile')} // Navigate to MyProfile page when clicked
              />
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
