import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token'); // Check if token exists

    // In React Router v6, `element` prop is used instead of `component` or `render`
    // and `Navigate` replaces `Redirect`.
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;