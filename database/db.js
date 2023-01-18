require('dotenv').config()
const mongoose = require('mongoose');

const options = {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity,
    connectTimeoutMS: 5000
}
const client = mongoose.connect(process.env.mongodb, options)
    .then(() => console.log('Connected to database!'))
    .catch((error) => console.error('Error connecting to db : ' + error));


module.exports = client;

