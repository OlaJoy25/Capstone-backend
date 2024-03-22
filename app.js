const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://jola:If5JC8E8PUuFuNzr@cluster0.bqef0uk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Check for MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a simple Mongoose schema and model
const SampleSchema = new mongoose.Schema({
  name: String,
});

const SampleModel = mongoose.model('Sample', SampleSchema);

// Define a route to create and retrieve a sample document
app.get('/', async (req, res) => {
  // Create a sample document
  const sampleDocument = new SampleModel({ name: 'Sample Name' });
  await sampleDocument.save();

  // Retrieve all sample documents
  const samples = await SampleModel.find();

  res.json(samples);
});

app.listen(port, () => {
  console.log('Server is running at http://localhost:' +port);
});