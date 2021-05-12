const bookModel = require("../models/bookModel");
const statusCode = require("../helper/statusCode");
const bookValidator = require("../validators/bookValidator");
const handler = require("../helper/controllersHelper");

const getAllBooks = async (req, res) => {
  const allBooks = await bookModel.find({});
  if (allBooks.length > 0) return res.status(statusCode.Success).json(allBooks);
  return res.status(statusCode.NoContent).end();
};
const getBookById = async (req, res, next) => {
  const bookId = req.params.id;
  // gard
  if (!bookId) handler.handler.handelEmptyData(res);
  try {
    const book = await bookModel.findById(bookId);
    if (book) return res.status(statusCode.Success).json(book);
    return res.status(statusCode.NoContent).end();
  } catch (error) {
    // maybe there is no book with the given id
    // pass it to error middleware to handle
    next(error);
  }
};
const createBook = (req, res, next) => {
  const data = req.body;
  if (!data) handler.handler.handelEmptyData(res);
  bookValidator.validateData(data, (err) => {
    if (err) return next(err);
    try {
      const newBook = bookModel.create({ ...data });
      res.status(statusCode.Created).end();
    } catch (error) {
      next(error);
    }
  });
};

const updateBook = (req, res) => {
  const data = req.body;
  if (!data) handler.handler.handelEmptyData(res);

  bookValidator.validateData(data, async (err) => {
    if (err) return next(err);
    try {
      const updatedBook = await bookModel.findByIdAndUpdate(
        { _id: req.params.id },
        { ...data }
      );
      res.status(statusCode.NoContent).end();
    } catch (error) {
      next(error);
    }
  });
};

const deleteBook = async (req, res, next) => {
  const bookId = req.params.id;
  if (!bookId) handler.handler.handelEmptyData(res);
  try {
    const resulat = await bookModel.findByIdAndDelete({ _id: bookId });
    res.status(statusCode.NoContent).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
};
