const BookModel = require("../models/bookModel");
const UserBookModel = require("../models/userBookModel");
const shelves = require("../shelves");

// Rate book.
exports.book_rate = async (request, response) => {
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
    return res.status(500).json(err);
  }
};
