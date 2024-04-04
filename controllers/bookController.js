// bookController.js

const Book = require("../Model/bookModel.js");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    return res.status(200).json({
      message: "All books",
      data: books
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { id, name, description,count,author,genre } = req.body;
    
    
    
    const existingBook = await Book.findOne({ id });
    if (existingBook) {
      return res.status(400).json({ message: "Book with this ID already exists" });
    }


    
    const newBook = new Book({ id, name, description, count,author,genre});

    
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", data: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to remove a book by ID
exports.removeBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the book by ID and remove it from the database
    const deletedBook = await Book.findOneAndDelete({ id });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book removed successfully", data: deletedBook });
  } catch (error) {
    console.error("Error removing book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


