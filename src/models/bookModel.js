const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 150,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxLength: 2000,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  }
);

const BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;
