// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { APPContext } from '../context/AppContext';

const Menu = () => {
  const { menu_list } = useParams();
  const { tech_list } = useContext(APPContext);
  const [filterMenu, setFilterMenu] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const applyFilter = () => {
    if (menu_list) {
      setFilterMenu(tech_list.filter(item => item.category === menu_list));
    } else {
      setFilterMenu(tech_list);
    }
  };

  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tech_list, menu_list]);

  const addToCart = (item) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = storedCart.find(cartItem => cartItem.id === item.id);
    const updatedCart = existingItem
      ? storedCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      : [...storedCart, { ...item, quantity: 1 }];

    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart
  };

  const handleOrderNow = (item) => {
    const token = localStorage.getItem('authToken'); // Check if token exists

    if (!token) {
      navigate('/login'); // If not logged in, navigate to login page
    } else {
      addToCart(item); // Add item to cart if logged in
      navigate('/cart'); // Then navigate to the cart page
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Choose your product and Order</h1>
      <div className="flex space-x-4 mb-6">
        {['Head-Phones', 'Powerbanks', 'Bluetooth-Speakers'].map(category => (
          <button
            key={category}
            onClick={() => navigate(menu_list === category ? '/menu' : `/menu/${category}`)}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {category.replace('-', ' ')}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filterMenu.length > 0 ? (
          filterMenu.map(item => (
            <div key={item.id} className="border rounded-lg p-4 shadow-lg">
              <img
                src={`${backendUrl}${item.imageUrl}`}
                alt={item.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <p className="text-lg font-bold">{item.name}</p>
              <p className="text-gray-600 mb-2">Price: Rs. {item.price}</p>
              <p className="text-gray-500 mb-4">{item.description}</p>
              <button
                onClick={() => handleOrderNow(item)} // Use the updated order now handler
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Order Now
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No items available for this category.</p>
        )}
      </div>
      {JSON.parse(localStorage.getItem('cart'))?.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/cart')}
            className="bg-yellow-500 text-white py-3 px-6 rounded hover:bg-yellow-600"
          >
            View Cart & Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;