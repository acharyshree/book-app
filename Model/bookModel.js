const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, "Please Enter valid id"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Please Enter valid name"],
    },
    description: {
        type: String,
        default: "This Book Has No Description"
    },
    count: {
        type: Number,
        default: 0
    },
    author:{
        type:String,
    },
    genre:{
        type:String,
    }
});

module.exports = mongoose.model("Book", bookSchema);
