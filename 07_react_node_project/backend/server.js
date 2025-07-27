const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import cors middleware
require('dotenv').config(); // Load environment variables

const app = express();

// Connect Database
connectDB();

// Init Middleware
// Allows us to accept JSON data in the body
app.use(express.json({ extended: false }));

// Enable CORS for all routes
// This is crucial for frontend (React) to communicate with backend (Node)
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));

// Simple test route
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));