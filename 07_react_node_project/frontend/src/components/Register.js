import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const { name, email, password, password2 } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setMessage('Passwords do not match');
            setIsError(true);
        } else {
            try {
                await authService.register(name, email, password);
                setMessage('Registration successful! Redirecting to login...');
                setIsError(false);
                setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
            } catch (err) {
                const errorMsg = err.errors ? err.errors[0].msg : err.msg || 'Registration failed';
                setMessage(errorMsg);
                setIsError(true);
            }
        }
    };

    return (
        <div style={formContainerStyle}>
            <h2>Register</h2>
            {message && (
                <p style={isError ? errorStyle : successStyle}>
                    {message}
                </p>
            )}
            <form onSubmit={e => onSubmit(e)} style={formStyle}>
                <div style={formGroupStyle}>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                        minLength="6"
                        required
                        style={inputStyle}
                    />
                </div>
                <button type="submit" style={buttonStyle}>Register</button>
            </form>
        </div>
    );
};

// Basic Inline Styles
const formContainerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const formGroupStyle = {
    marginBottom: '15px',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box', // Include padding and border in the element's total width and height
};

const buttonStyle = {
    background: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
};

const errorStyle = {
    color: 'red',
    backgroundColor: '#ffe6e6',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
};

const successStyle = {
    color: 'green',
    backgroundColor: '#e6ffe6',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
};

export default Register;