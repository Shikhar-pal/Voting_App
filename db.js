const mongoose = require('mongoose');
require('dotenv').config();

// define the connection string to the MongoDB database
// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.DB_URL;

// connect to the MongoDB database using Mongoose
mongoose.connect(mongoURL);

// get the default connection
const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected');
});


// export the database connection

module.exports = db;