const bookModel = require("../models/bookModel");
const statusCode = require("../helper/statusCode");
const bookValidator = require("../validators/bookValidator");
const handler = require("../helper/controllersHelper");
const UserBookModel = require("../models/userBookModel");
const shelves = require("../helper/shelves");

const getAllBooks = async (req, res) => {
  const allBooks = await bookModel.find({});
  if (allBooks.length > 0) return res.status(statusCode.Success).json(allBooks);
  return res.status(statusCode.NoContent).end();
};

const getBookById = async (req, res, next) => {
  const bookId = req.params.id;
  if (!bookId) handler.handelEmptyData(res);
  try {
    const book = await bookModel.findById(bookId);
    if (book) return res.status(statusCode.Success).json(book);
    return res.status(statusCode.NoContent).end();
  } catch (error) {
    next(error);
  }
};

const createBook = (req, res, next) => {
  const data = req.body;
  if (!data) handler.handelEmptyData(res);
  bookValidator.validateData(data, (err) => {
    if (err) return next(err);
    try {
      const newBook = bookModel.create({
        ...data,
      });
      res.status(statusCode.Created).end();
    } catch (error) {
      next(error);
    }
  });
};

const updateBook = (req, res) => {
  const data = req.body;
  if (!data) handler.handelEmptyData(res);
  bookValidator.validateData(data, async (err) => {
    if (err) return next(err);
    try {
      const updatedBook = await bookModel.findByIdAndUpdate(
        { _id: req.params.id, },{ ...data,}
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

async function updateBookAvgRating(bookId) {
  const ratings = await UserBookModel.find({
    book: bookId, rating: { $exists: true, },
  });
  const avgRating =
    ratings.reduce((total, next) => total + next.rating, 0) / ratings.length;
  const book = await bookModel.findOneAndUpdate(
    { _id: bookId },
    { avgRating: avgRating },
    { useFindAndModify: false }
  );
}

async function updateExistingRating({ userId, bookId, rating }) {
  return await UserBookModel.findOneAndUpdate(
    { book: bookId, user: userId },
    { rating: rating },
    { useFindAndModify: false }
  );
}

async function addNewRating({ bookId, userId, rating }) {
  const userBookInstance = new UserBookModel({
    book: bookId,
    user: userId,
    rating: rating,
    shelf: shelves.READ,
  });
  return await userBookInstance.save();
}

// Rate book.
const rateBook = async (request, response) => {
  try {
    const rating = {
      userId: request.body.user,
      bookId: request.params.id,
      rating: request.body.rating,
    };
    const book = await updateExistingRating(rating);
    if (book) response.sendStatus(statusCode.Success);
    else {
      const userBookDoc = addNewRating(rating);
      response.status(statusCode.Success).json(userBookDoc);
    }
    updateBookAvgRating(rating.bookId);
  } catch (err) {
    return response.status(statusCode.ServerError).json(err);
  }
};

async function removeBookFromShelf({ bookId, userId }) {
  await UserBookModel.findOneAndDelete({ book: bookId, user: userId });
}

async function addBookToShelf({ bookId, userId, shelf }) {
  const userBookInstance = new UserBookModel({
    book: bookId,
    user: userId,
    shelf: shelf,
  });
  await userBookInstance.save();
}

async function updateBookShelf({ bookId, userId, shelf }) {
  return await UserBookModel.findOneAndUpdate(
    { book: bookId, user: userId },
    { shelf: shelf },
    { useFindAndModify: false }
  );
}

const shelveBook = async (request, response) => {
  try {
    const bookShelf = {
      userId: request.body.user,
      bookId: request.params.id,
      shelf: request.body.shelf,
    };
    if (bookShelf.shelf === 0) removeBookFromShelf(bookShelf);
    else {
      const book = await updateBookShelf(bookShelf);
      if (book) response.sendStatus(statusCode.Success);
      else addBookToShelf(bookShelf);
    }
    response.status(statusCode.Success);
  } catch (err) {
    return response.status(statusCode.ServerError).json(err);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
  rateBook,
  shelveBook,
};
