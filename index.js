const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection (replace with your own MongoDB connection string)
mongoose.connect("mongodb://localhost:27017/todo-list", {
    userNewUrlParser: true,
    useUnifiedTopology: true,
})