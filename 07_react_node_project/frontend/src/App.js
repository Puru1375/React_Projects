import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container"> {/* Use a container for styling if you add global CSS */}
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    {/* Protected Route */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

// Simple Home Component
const Home = () => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Welcome to the MERN Auth App!</h1>
        <p>Please register or log in to access the dashboard.</p>
    </div>
);

export default App;