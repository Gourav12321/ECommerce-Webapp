import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assumes you're using Redux for state management
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Check if the user is an admin
const AdminRoute = ({ children }) => {
    const user = useSelector((state) => state.user.user); // Adjust based on your Redux setup

    if (user && user.role === 'Admin') {
        return children;
    } else {
        toast.error('You cannot access this page. Only admin can.');
        return <Navigate to="/" />;
    }
    <ToastContainer/>
};

export default AdminRoute;
