const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const bookModel = require("../models/bookModel");
const userBookModel = require("../models/userBookModel");

const UserScheme = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: String,
  avatar: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user", "author"],
    default: "user",
  },
  gender: {
    type: String,
    //  required: true,
    enum: ["Male", "Female"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

UserScheme.methods.comparePassword = function (password, hash_password) {
  try {
    return bcrypt.compareSync(password, this.password);
  } catch (err) {
    console.log(err);
  }
};

UserScheme.post('findOneAndDelete', async function (doc, next) {
  const books = await bookModel.find({ author: doc._id }).lean().exec();
  console.log(books)
  books.forEach(async function (book) {
    await userBookModel.deleteMany({
      book: book._id
    })
  })
  await bookModel.deleteMany({ author: doc._id })
  next()
})

const UserModel = mongoose.model("User", UserScheme);
module.exports = UserModel;
