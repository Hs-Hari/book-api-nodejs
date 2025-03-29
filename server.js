// ExpressJS
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

//Routers
const authRoutes = require("./src/routes/authRoute");
const bookRoutes = require("./src/routes/book");
const logger = require("./src/middleware/logger")

// create a instance of express
const app = express();

const dbURL = process.env.MONGO_URI;
const port = process.env.PORT;

//Database connection status
mongoose
    .connect(process.env.MONGO_URI)
	.then(() => { console.log("Connected to MongoDB"); })
	.catch((err) => { console.error("MongoDB connection error:", err); });

app.use(express.json());
app.use(logger);

//List of APIs
app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);

//public API's for health status
app.get('/', (req, res) => {
	res.json({ message: "Welcome to Book-api" })
});

app.get('/api/health', (req, res) => {
	res.json({ health: "API Server is up & running." })
});

//Server Status
app.listen(port, () => {
	console.log("Book-api Server is up and running on Port: " + port);
});
