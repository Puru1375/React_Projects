import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = authService.getCurrentUser(); // This will return null if no token or invalid
        if (user) {
            // No need to await here, it's already awaited inside getCurrentUser
            // just check the presence of token for basic UI update
            authService.getCurrentUser()
                .then(data => setCurrentUser(data))
                .catch(() => setCurrentUser(null)); // If error, user is not logged in
        } else {
            setCurrentUser(null);
        }
    }, []); // Run once on component mount

    // To re-evaluate user status after login/logout, we need a way to trigger this effect.
    // For simplicity, we'll rely on page refresh or direct navigation for now.
    // In a real app, you'd use context API or a state management library.

    const handleLogout = () => {
        authService.logout();
        setCurrentUser(null); // Clear current user state
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav style={navbarStyle}>
            <div style={navBrandStyle}>
                <Link to="/" style={linkStyle}>MERN Auth App</Link>
            </div>
            <ul style={navListStyle}>
                {currentUser ? (
                    <>
                        <li style={navItemStyle}>
                            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                        </li>
                        <li style={navItemStyle}>
                            <a onClick={handleLogout} style={linkStyle}>
                                Logout ({currentUser.name})
                            </a>
                        </li>
                    </>
                ) : (
                    <>
                        <li style={navItemStyle}>
                            <Link to="/register" style={linkStyle}>Register</Link>
                        </li>
                        <li style={navItemStyle}>
                            <Link to="/login" style={linkStyle}>Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

// Basic Inline Styles (for quick setup, use CSS modules for real projects)
const navbarStyle = {
    background: '#333',
    color: '#fff',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const navBrandStyle = {
    fontSize: '1.5rem',
};

const navListStyle = {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
};

const navItemStyle = {
    marginLeft: '20px',
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
};

export default Navbar;