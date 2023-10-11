import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

// Pull environment variables from .env file
dotenv.config();

// Creating an express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Parses incoming JSON requests and puts it in req.body

// Routes
app.get("/", async (req, res) => {
	res.send("Hello!");
});

app.use("/api/post", postRoutes);
app.use("/api/dalle", dalleRoutes);

// Start server
const startServer = () => {
	// Useful for the search functionality
	// Only fields specified in the Schema will be saved in the database
	mongoose.set("strictQuery", true);

	// Connect to database
	mongoose
		.connect(process.env.MONGODB_URL)
		.then(() => {
			console.log("Connected to database");

			// Then listen for requests
			app.listen(process.env.PORT, () => {
				console.log("Server has started on port: http://localhost:8080");
			});
		})
		.catch((err) => console.log(err));
};

startServer();
