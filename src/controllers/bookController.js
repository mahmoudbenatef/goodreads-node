const bookModel = require("../models/bookModel");
const statusCode = require("../helper/statusCode");
const bookValidator = require("../validators/bookValidator");
const handler = require("../helper/controllersHelper");
const UserBookModel = require("../models/userBookModel");
const shelves = require("../shelves");

const getAllBooks = async (req, res) => {
  // get all books
  const allBooks = await bookModel.find({});
  if (allBooks.length > 0) return res.status(statusCode.Success).json(allBooks); // collection has data
  return res.status(statusCode.NoContent).end(); // collection is empty
};


const getBookById = async (req, res, next) => {
  const bookId = req.params.id;
  // gard
  if (!bookId) handler.handelEmptyData(res);
  try {
    // get the book and return it
    const book = await bookModel.findById(bookId);
    if (book) return res.status(statusCode.Success).json(book);
    return res.status(statusCode.NoContent).end();
  } catch (error) {
    // maybe there is no book with the given id
    next(error);
  }
};


const createBook = (req, res, next) => {
  const data = req.body;
  // function gard

  if (!data) handler.handelEmptyData(res);
  // validate the data before create a new book
  bookValidator.validateData(data, (err) => {
    if (err) return next(err);
    try {
      // craete a new book
      const newBook = bookModel.create({ ...data });
      res.status(statusCode.Created).end();
    } catch (error) {
      next(error);
    }
  });
};


const updateBook = (req, res) => {
  const data = req.body;
  // function gard
  if (!data) handler.handelEmptyData(res);

  //validate the data before update it
  bookValidator.validateData(data, async (err) => {
    if (err) return next(err);
    try {
      // update the book with new data
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
  if (!bookId) handler.handelEmptyData(res);
  try {
    const resulat = await bookModel.findByIdAndDelete({ _id: bookId });
    res.status(statusCode.NoContent).end();
  } catch (error) {
    next(error);
  }
};


// Rate book.
const rateBook = async (request, response) => {
  try {
    const userId = request.body.user;
    const bookId = request.params.bid;
    const rating = request.body.rating;
    const book = await UserBookModel.findOneAndUpdate(
      {
        book: bookId,
        user: userId,
      },
      {
        rating: rating,
      },
      { useFindAndModify: false }
    );
    if (book) response.sendStatus(200);
    else {
      const userBookInstance = new UserBookModel({
        book: bookId,
        user: userId,
        rating: rating,
        shelf: shelves.READ,
      });
      const userBookDoc = await userBookInstance.save();
      response.status(200).json(userBookDoc);
    }
  } catch (err) {
    return response.status(500).json(err);
  }
};


module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
  rateBook
};


