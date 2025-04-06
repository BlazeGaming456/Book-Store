// import express from "express";
// import mongoose from "mongoose";
// import { PORT, mongoDBUrl } from "./config.js";
// import { Book } from "./models/bookModel.js";
// import booksRouter from './routes/bookRoutes.js'
// import cors from 'cors'

// const app = express();

// //Middleware to parse JSON
// app.use(express.json());

// app.use('/books', booksRouter)

// //1st method
// app.use(cors())

// //2nd method
// // app.use(cors({
// //   origin: 'http://localhost:5173', // Allow requests from this origin
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   allowedHeaders: ['Content-Type'],
// // }));

// // app.use(cors({
// //   origin: 'http://localhost:5173', // Allow requests from this origin
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
// //   allowedHeaders: ['Content-Type'], // Allowed headers
// // }));

// app.options('*', cors()); // Enable preflight for all routes

// //Connection with the database
// mongoose
//   .connect(mongoDBUrl)
//   .then(() => {
//     console.log("App connected to the databse");
//     app.listen(PORT, () => {
//       console.log(`Server listening at Port ${PORT}`);
//     });
//   })
//   .catch((error) => console.log(error));

//   // First Route
//   app.get("/", (req, res) => {
//     console.log(req);
//     return res.status(200).send("Welcome to the Book Store!");
//   });

import express from "express";
import mongoose from "mongoose";
import booksRouter from './routes/bookRoutes.js';
import cors from 'cors';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const mongoDBUrl = process.env.mongoDBUrl;

const app = express();

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type'], // Allowed headers
}));

// Middleware to parse JSON
app.use(express.json());

app.use('/books', booksRouter);

// Enable preflight for all routes
app.options('*', cors());

// Connection with the database
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("App connected to the database");
    app.listen(PORT, () => {
      console.log(`Server listening at Port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

// First Route
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the Book Store!");
});