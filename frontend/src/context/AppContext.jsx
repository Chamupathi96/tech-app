// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const APPContext = createContext();

const AppContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure this is set correctly
    const [tech_list, setTechList] = useState([]);
    const [orders, setOrders] = useState([]);

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
    };

    // Ensure token is synchronized with localStorage changes
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken !== token) {
            setToken(storedToken);
        }
    }, [token]); // Watch for changes in token

    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/item/list`); // Fetch items
                console.log("Fetched tech_list:", data); // Log fetched data for debugging
                if (data) {
                    setTechList(data); // Set tech_list to fetched data
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItemsData();
    }, [backendUrl]);

    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/orders/list`);
                console.log("Fetched orders:", data);
                if (data) {
                    setOrders(data); // Set orders to fetched data
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrdersData();
    }, [backendUrl]);

    

    const value = {
        tech_list,
        orders,
        token,
        setToken,
        logout,
    };

    return (
        <APPContext.Provider value={value}>
            {props.children}
        </APPContext.Provider>
    );
};

export default AppContextProvider;