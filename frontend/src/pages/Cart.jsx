// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Cart = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        // Load cart from local storage
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCartItems(storedCart);
        } else if (location.state?.cart) {
            // Fallback: Use cart from navigation state if present
            setCartItems(location.state.cart);
        }
    }, [location.state]);

    // Function to remove one quantity from an item in the cart
    const removeFromCart = (id) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                // Decrease quantity by 1
                const newQuantity = item.quantity - 1;
                if (newQuantity > 0) {
                    return { ...item, quantity: newQuantity }; // Return item with reduced quantity
                } else {
                    return null; // Mark item for removal
                }
            }
            return item;
        }).filter(item => item !== null); // Filter out any null items (items to be removed)

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    };

    // Function to calculate the total cost
    const getTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Cart</h1>

            {/* Cart table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Total</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <tr key={item.id} className="border-b">
                                    <td className="px-4 py-2">
                                        <img src={`${backendUrl}${item.imageUrl}`} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                    </td>
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.quantity}</td>
                                    <td className="px-4 py-2">{item.price.toFixed(2)}</td>
                                    <td className="px-4 py-2">{(item.price * item.quantity).toFixed(2)}</td>
                                    <td className="px-4 py-2">
                                        <button 
                                            onClick={() => removeFromCart(item.id)} // Use item.id here
                                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                        >
                                            Remove One
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    Your cart is empty.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Order summary and action buttons */}
            <div className="mt-6 flex justify-between items-center">
                <div>
                    <p className="text-lg font-semibold">Total: Rs.{getTotal().toFixed(2)}</p>
                </div>
                <div className="space-x-4">
                    <button 
                        onClick={() => navigate('/')} 
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Go to Home
                    </button>
                    <button 
                        onClick={() => navigate('/checkout')} 
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;