const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase, FoodModel } = require('./models/foodModel');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// MongoDB Atlas connection string
const url = 'mongodb+srv://yuva_aj:yuva_aj@cluster0.kpkb4fi.mongodb.net/foody?retryWrites=true&w=majority';

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

// Connect to MongoDB Atlas when the server starts
let mongoClient;
let database;

async function startServer() {
  try {
    // Connect to MongoDB Atlas and set the database reference
    mongoClient = await connectToDatabase(url);
    database = mongoClient.db('foody'); 
    console.log('Server started and database connected.');

    // Register routes after the database connection is established
    const foodRoutes = require('./routes/foodRoutes')(database, FoodModel);
    app.use('/foods', foodRoutes);
    
    app.listen(3000, () => {
      console.log(`Listening to port ${port}`);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1); // Exit if there's a failure
  }
}

startServer();
