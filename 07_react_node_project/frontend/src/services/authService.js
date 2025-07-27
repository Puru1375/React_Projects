import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/'; // Ensure this matches your backend URL

const register = async (name, email, password) => {
    try {
        const response = await axios.post(API_URL + 'register', {
            name,
            email,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error.response.data.msg || error.message);
        throw error.response.data; // Throw error data for component to handle
    }
};

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'login', {
            email,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response.data.msg || error.message);
        throw error.response.data;
    }
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await axios.get(API_URL + 'me', {
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch current user:', error.response.data.msg || error.message);
        logout(); // Logout user if token is invalid
        throw error.response.data;
    }
};


const authService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default authService;