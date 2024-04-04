const User = require("../Model/userModel");
const Book = require("../Model/bookModel.js");

exports.registerUser = async (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({ message: "Enter valid credentials" });
  }
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res
        .status(201)
        .json({ message: "User created successfully" ,user});

  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

exports.loginUser = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).json({ message: "Enter valid email & password" });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid  password" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Error during login" });
  }
};


exports.borrowBook = async (req, res) => {
  const { useremail, bookid } = req.body;

  if (!useremail || !bookid) {
    return res.status(400).json({ message: "Please provide valid user email and book id" });
  }

  try {
    const user = await User.findOne({ email: useremail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = await Book.findOne({ id: bookid });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.count <= 0) {
      return res.status(400).json({ message: "Book not available for borrowing" });
    }

    if (user.books.includes(bookid)) {
      return res.status(400).json({ message: "User already has this book" });
    }

    user.books.push(bookid);
    await user.save();

    book.count -= 1;
    await book.save();

    return res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    console.error("Error borrowing book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.returnBook = async (req, res) => {
  const { useremail, bookid } = req.body;

  if (!useremail || !bookid) {
    return res.status(400).json({ message: "Please provide valid user email and book id" });
  }

  try {
    const user = await User.findOne({ email: useremail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.books.includes(bookid)) {
      return res.status(400).json({ message: "User doesn't have this book" });
    }

    user.books = user.books.filter(book => book !== bookid);
    await user.save();

    const book = await Book.findOne({ id: bookid });
    if (book) {
      book.count += 1;
      await book.save();
    }

    return res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    console.error("Error returning book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



exports.deleteBook = async (req, res) => {
  const { bookid } = req.body;

  if (!bookid) {
    return res.status(400).json({ message: "Please provide a valid book id" });
  }

  try {
    // Find the book by ID and delete it
    const deletedBook = await Book.deleteOne({ id: bookid });

    if (deletedBook.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



