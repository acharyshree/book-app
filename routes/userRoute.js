const express = require("express");

const {registerUser,loginUser,borrowBook,returnBook } = require("../controllers/userController")

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/borrowbook").post(borrowBook);
router.route("/returnBook").post(returnBook);

// router.route("/userbooks/:id").get(getuserbooks);



module.exports = router;