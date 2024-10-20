// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        address: '',
        zipcode: '',
        phone: '',
    });

    const navigate = useNavigate(); // Initialize the useNavigate hook
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const handleInputChange = (e) => {
        setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const deliveryFee = 50; // Example delivery fee

    const handlePlaceOrder = async () => {
      const orderDetails = {
          name: shippingDetails.name,
          address: shippingDetails.address,
          zipcode: shippingDetails.zipcode,
          phone: shippingDetails.phone,
          
          items: cartItems.map(item => ({
              itemId: item.id, // Replace '_id' with the actual property for the item ID
              quantity: item.quantity,
              itemName: item.name,
              category:item.category
             
          })),
          totalAmount: calculateSubtotal() + deliveryFee,
      };
  
      try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/place`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(orderDetails),
          });
  
          if (response.ok) {
              alert('Order is successfully placed, thank you for trusting us!');
              localStorage.removeItem('cart');
              navigate('/verify');
          } else {
              alert('Failed to place order. Please try again.');
          }
      } catch (error) {
          console.error('Error placing order:', error);
          alert('An error occurred. Please try again later.');
      }
  };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Order Summary */}
                <div className="border rounded-lg p-4 shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map(item => (
                                <div key={item._id} className="mb-4">
                                    <p><strong>Category:</strong> {item.category}</p> {/* Display item category */}
                                    <p>{item.name} - Rs. {item.price} x {item.quantity}</p>
                                </div>
                            ))}
                            <p className="font-bold">Subtotal: Rs. {calculateSubtotal().toFixed(2)}</p>
                            <p className="font-bold">Delivery Fee: Rs. {deliveryFee.toFixed(2)}</p>
                            <p className="font-bold">Total: Rs. {(calculateSubtotal() + deliveryFee).toFixed(2)}</p>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                {/* Right: Shipping Details */}
                <div className="border rounded-lg p-4 shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
                    <input
                        className="border p-2 w-full mb-4"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={shippingDetails.name}
                        onChange={handleInputChange}
                    />
                    <input
                        className="border p-2 w-full mb-4"
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={shippingDetails.address}
                        onChange={handleInputChange}
                    />
                    <input
                        className="border p-2 w-full mb-4"
                        type="text"
                        name="zipcode"
                        placeholder="Zip Code"
                        value={shippingDetails.zipcode}
                        onChange={handleInputChange}
                    />
                    <input
                        className="border p-2 w-full mb-4"
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={shippingDetails.phone}
                        onChange={handleInputChange}
                    />
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;