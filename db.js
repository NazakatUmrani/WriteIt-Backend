const mongoose = require('mongoose');

// Load env variables
require('dotenv').config();
let mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
}

// Export the function
module.exports = connectToMongo;