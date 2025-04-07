import express from "express";
import mongoose from "mongoose";
import booksRouter from "./routes/bookRoutes.js";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const mongoDBUrl = process.env.mongoDBUrl;

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://book-store-frontend-gold.vercel.app" // Removed trailing slash
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"], // Added common headers
  credentials: true // If you're using cookies/auth
};

// Apply CORS middleware once with options
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions)); // This should now work properly

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/books", booksRouter);

// Database connection
mongoose.connect(mongoDBUrl)
  .then(() => {
    console.log("App connected to the database");
    app.listen(PORT, () => {
      console.log(`Server listening at Port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

// Root route
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the Book Store!");
});