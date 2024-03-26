const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://jola:If5JC8E8PUuFuNzr@cluster0.bqef0uk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Check for MongoDB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a simple Mongoose schema and model
const SubscriberSchema = new mongoose.Schema({
  email: String,
});

const subscriberModel = mongoose.model("subscriber", SubscriberSchema);

// Define a route to create and retrieve a sample document
app.get("/", async (req, res) => {
  return res.send("Hello World");
});

// /subscribe route to create a new subscriber
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  const subscriber = new subscriberModel({ email });
  await subscriber.save();
  return res.send(subscriber._id);
});

app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
});
