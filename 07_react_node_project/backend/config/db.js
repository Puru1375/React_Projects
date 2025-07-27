const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // These options are often deprecated in newer Mongoose versions,
            // but including them for broader compatibility if needed:
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

//bddndngnfgnngnnnngn

module.exports = connectDB;