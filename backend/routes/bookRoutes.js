import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Create a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(404).send("Send all the required details");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(`Error: ${error.message}`);
  }
});

//Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(`Error: ${error.message}`);
  }
});

//Get a single element by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json({ book });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(`Error: ${error.message}`);
  }
});

//Update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Send all the required details");
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).send("Book successfully updated");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(`Error:${error.message}`);
  }
});

//Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send("Book deleted successfully!");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(`Error: ${error.message}`);
  }
});

export default router;
