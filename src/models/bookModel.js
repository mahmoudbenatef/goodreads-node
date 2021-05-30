const mongoose = require("mongoose");
const userBookModel = require("../models/userBookModel");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 200,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxLength: 2000,
    required: true,
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
  avgRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  }
});

// populate the author and cateogy to use it with pagination
bookSchema.pre("find", function () {
  this.populate("author", { firstname: 1, lastname: 1, avatar: 1 }).populate("category");
});

// bookSchema.post('deleteMany', async function (doc, next) {
//   console.log("removingMany");
//   console.log(doc)
//   await userBookModel.deleteMany({ book: doc._id })
//   next()
// })

// bookSchema.post('deleteMany', async (doc, next) => {
//   console.log("removingMany");

//   if (doc) {
//     await userBookModel.deleteMany({
//       book: doc._id
//     })
//     next()
//   }
// })

const BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;
