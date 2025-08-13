const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');



const clipRoutes = require('./routes/clipRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

connectDB();

app.use(cors());



app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to the puru`s backend server!');
});

app.use('/api/clips', clipRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


