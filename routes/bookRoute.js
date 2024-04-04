const express = require("express");
const router = express.Router();



const { addBook, removeBook,getAllBooks } = require("../controllers/bookController");
const { deleteBook } = require("../controllers/userController");




// Book routes
router.route("/getallbooks").get(getAllBooks);
router.route("/addbook").post(addBook);
router.route("/removebook/:id").delete(removeBook);
router.route("/deletebook").post(deleteBook);


module.exports = router;