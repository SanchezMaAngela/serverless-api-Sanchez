const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// your mongoDB Cloud URL
const dbCloudUrl = 
    'mongodb+srv://user:angela123@cluster0.csnug0a.mongodb.net/?retryWrites=true&w=majority';
// your mongoDB Local URL
const dbLocalUrl = 'mongodb://localhost:27017/express-mongo-api';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(dbCloudUrl || dbLocalUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

app.use('./netlify/functions/api', router);

module.exports.handler = serverless(app);
