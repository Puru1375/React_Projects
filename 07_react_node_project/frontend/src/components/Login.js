import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const { email, password } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await authService.login(email, password);
            setMessage('Login successful! Redirecting to dashboard...');
            setIsError(false);
            setTimeout(() => {
                navigate('/dashboard');
                window.location.reload(); // Force a reload to update Navbar's user state
            }, 2000);
        } catch (err) {
            const errorMsg = err.errors ? err.errors[0].msg : err.msg || 'Login failed';
            setMessage(errorMsg);
            setIsError(true);
        }
    };

    return (
        <div style={formContainerStyle}>
            <h2>Login</h2>
            {message && (
                <p style={isError ? errorStyle : successStyle}>
                    {message}
                </p>
            )}
            <form onSubmit={e => onSubmit(e)} style={formStyle}>
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
                <button type="submit" style={buttonStyle}>Login</button>
            </form>
        </div>
    );
};

// Re-using styles from Register.js for consistency
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
    boxSizing: 'border-box',
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

export default Login;