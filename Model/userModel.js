const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter valid name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter  email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter password"],
    minLength: [1, "Please Enter valid password"],
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  books:[]
});

module.exports = mongoose.model("User",userSchema);