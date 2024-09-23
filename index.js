const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();  // To load environment variables from a .env file
const app = express();
const PORT = process.env.NODE_DOCKER_PORT || 3000;
// Middleware to parse JSON request body
app.use(express.json());  // This is already included in the earlier example

// MongoDB connection using environment variables
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const mongoURI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the To-Do List API!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const todoRouter = require("./routes/todo");
app.use('/todos', todoRouter);