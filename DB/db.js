const mongoose = require('mongoose');

// Load env variables
require('dotenv').config();
let mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { dbName: "writeit" });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log("Error in connecting to MongoDB",error);
    }
}

// Export the function
module.exports = connectToMongo;