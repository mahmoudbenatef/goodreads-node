const userBookModel = require("../models/userBookModel");
const statusCode = require("../helper/statusCode");
const BookModel = require("../models/bookModel");
const UserModel = require("../models/userModel");

const getAllBooks = async (req, res) => {
  const user_id = req.params.id;
  const userBookInfo = await userBookModel.find({user: user_id}).lean().populate("book", "name avgRating image").lean().populate("author", "firstname lastname");
  if (userBookInfo) {
    return res.status(statusCode.Success).json(userBookInfo);
  }
  return res.status(statusCode.NoContent).end();
};
const getBookById = (req, res) => {};
const addNewBook = (req, res) => {};
const editBook = (req, res) => {};
const deleteBook = (req, res) => {};
const changeBookShelf = (req, res) => {};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  editBook,
  deleteBook,
  changeBookShelf,
};
