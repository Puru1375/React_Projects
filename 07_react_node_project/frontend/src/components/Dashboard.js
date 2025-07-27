import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('Loading user data...');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
                setMessage(`Welcome, ${currentUser.name}! This is your private dashboard.`);
            } catch (err) {
                setMessage(err.msg || 'Failed to fetch user data. Please login again.');
                // Optional: Automatically redirect to login if token is invalid
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]); // Add navigate to dependency array to avoid lint warnings

    return (
        <div style={dashboardStyle}>
            <h2>Dashboard</h2>
            <p>{message}</p>
            {user && (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Member Since:</strong> {new Date(user.date).toLocaleDateString()}</p>
                </div>
            )}
        </div>
    );
};

// Basic Inline Styles
const dashboardStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
};

export default Dashboard;