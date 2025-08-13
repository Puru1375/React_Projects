const mongoose = require('mongoose');

const connectDB = async () => {
    
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/Online_Clipboard', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('✅ Connected to MongoDB');
        }).catch((err) => {
            console.error('❌ Connection error:', err);
        });
    
}

module.exports = connectDB;




