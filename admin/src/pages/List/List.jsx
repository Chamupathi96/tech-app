// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const List = ({url}) => {
    
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/item/list`);
            console.log(response.data);
            setList(response.data); 
        } catch (error) {
            toast.error("Error fetching items: " + error.message);
        }
    };

    const removeItem = async (itemId) => {
        try {
            const response = await axios.delete(`${url}/api/item/delete/${itemId}`);
            if (response.data.success) {
                // Filter the list to remove the deleted item
                setList((prevList) => prevList.filter(item => item.id !== itemId)); // Ensure to use 'id' for comparison
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error deleting item: " + error.message);
        }
    };

    useEffect(() => {
        fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='list add flex-col'>
            <p>All Item List</p>
            <div className='list-table'>
                <div className='list-table-format title'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item) => {
                    return (
                        <div key={item.id} className='list-table-format'> {/* Use item.id here */}
                            <img src={`${url}${item.imageUrl}`} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>Rs.{item.price}</p>
                            <p onClick={() => removeItem(item.id)} className='cursor'>X</p> {/* Use item.id here */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default List;