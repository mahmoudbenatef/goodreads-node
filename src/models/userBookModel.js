const mongoose = require("mongoose");

const WANT_TO_READ = 1;
const CURRENTLY_READING = 2;
const READ = 3;

const userBookSchema = new mongoose.Schema({
  book: {
    type: String,
    ref: "Book",
    required: true,
  },
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  shelf: {
    type: String,
    required: true,
    enum: [WANT_TO_READ, CURRENTLY_READING, READ],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  review: {
    type: String,
    maxLength: 5000,
    trim: true,
  }
});

const userBookModel = mongoose.model("UserBook", userBookSchema);
module.exports = userBookModel;
