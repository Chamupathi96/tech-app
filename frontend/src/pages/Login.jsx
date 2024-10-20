// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { APPContext } from '../context/AppContext';

const Login = () => {
  const { setToken } = useContext(APPContext); // Use context to set token
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // For showing error messages
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long, and contain symbols and numbers.";
    }

    if (state === "Sign Up" && !name.trim()) {
      return "Full name is required for sign-up.";
    }

    return null;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true); // Start loading

    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      setLoading(false); // Stop loading
      return;
    }

    const payload = { email, password, fullName: name };

    try {
      const response = await fetch(state === "Sign Up" ? 'http://localhost:8085/auth/signup' : 'http://localhost:8085/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token); // Save token in local storage
        setToken(data.token); // Set token in context
        navigate('/my-profile'); // Navigate to My Profile after successful login
      } else {
        setError(data.message); // Display error message from API
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('There was an error processing your request. Please try again later.');
    } finally {
      setLoading(false); // Stop loading after the request completes
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>Please {state === "Sign Up" ? "sign up" : "log in"} to order </p>
        
        {error && <p className="text-red-500">{error}</p>} {/* Display validation error */}
        
        {loading && <p className="text-primary">Loading...</p>} {/* Display loading message */}
        
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              disabled={loading} // Disable input while loading
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={loading} // Disable input while loading
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={loading} // Disable input while loading
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base" disabled={loading}>
          {loading ? 'Processing...' : (state === "Sign Up" ? "Create Account" : "Login")}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;