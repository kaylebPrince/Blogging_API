const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_DB_URI = process.env.MONGO_DB_URI;

// connect to mongodb
const connectToMongoDB = async() => {
    try{
        const conn = await mongoose.connect(MONGO_DB_URI);
        console.log(`Connected to MongoDB successfully at ${conn.connection.host}`);
    } catch(err){
        console.log("Error connecting to MongoDB", err);
        process.exit(1);
    }
}

module.exports = connectToMongoDB;