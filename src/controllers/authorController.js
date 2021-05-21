const userModel = require("../models/userModel.js");
const bookModel = require("../models/bookModel.js");
const statusCode = require("../helper/statusCode");
const handler = require("../helper/controllersHelper");
const authorValidator = require("../validators/authorValidator");
const fs = require("fs");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const getAllAuthors = async (req, res, next) => {
  const page = parseInt(req.query.page) || 0;
  const Page_Size = parseInt(req.query.limit) || 2;
  const total = await userModel.countDocuments({ role: "author" });
  let allAuthors;
  if (!req.query.page) {
    allAuthors = await userModel.find({ role: "author" });
  } else {
    allAuthors = await userModel
      .find({ role: "author" })
      .limit(Page_Size)
      .skip(page * Page_Size);
  }
  // const allAuthors = await userModel.find({ role: "author" })
  // .limit(Page_Size)
  // .skip(page * Page_Size)
  if (allAuthors.length > 0) {
    return res.status(statusCode.Success).json({
      totalPages: Math.ceil(total / Page_Size),
      allAuthors,
    });
  }

  return res.status(statusCode.NoContent).end();
};
const getAuthorById = async (req, res, next) => {
  const authorId = req.params.id;
  if (!authorId) handler.handelEmptyData(res);
  try {
    const author = await userModel.findById(authorId);
    if (author) return res.status(statusCode.Success).json(author);
    return res.status(statusCode.NoContent).end();
  } catch (error) {
    next(error);
  }
};
const createAuthor = (req, res, next) => {
  const data = req.body;
  if (!data) handler.handelEmptyData(res);
  authorValidator.validateData({ ...data, avatar: req.file }, async (err) => {
    if (err) return next(err);
    try {
      const newAuthor = await userModel.create({
        ...data,
        email: Date.now(),
        avatar: req.file.path,

        DOB: req.body.dob,
      });
      res.status(statusCode.Created).end();
    } catch (error) {
      next(error);
    }
  });
};
const deleteAuthor = async (req, res, next) => {
  const authorId = req.params.id;

  if (!authorId) handler.handelEmptyData(res);
  const imagePath = await userModel.find({ _id: authorId });
  try {
    const result = await userModel.findByIdAndDelete({ _id: authorId });
    res.status(statusCode.NoContent).end();
    fs.unlink(imagePath[0].avatar, (error) => {
      console.log(error);
    });
  } catch (error) {
    next(error);
  }
};
const updateAuthor = (req, res, next) => {
  let fakeAVA;
  const data = { ...req.body };

  if (!data) handler.handelEmptyData(res);
  if (!data.avatar) {
    fakeAVA = { ...data, avatar: "fake" };
  } else {
    fakeAVA = { ...req.body };
  }

  authorValidator.validateData(fakeAVA, async (err) => {
    if (err) return next(err);

    try {
      const updated = await userModel.findByIdAndUpdate(
        { _id: req.params.id },
        { ...data }
      );
      res.status(statusCode.NoContent).end();
    } catch (error) {
      next(error);
    }
  });
};

const getAuthorBooks = async (req, res, next) => {
  try {
    const skip = req.params.skip;
    const authorId = req.params.id;
    const books = await bookModel.aggregate([
      { $match: { author: ObjectId(authorId) } },
      {
        $lookup: {
          from: "userbooks",
          localField: "_id",
          foreignField: "book",
          as: "usersRatings",
        },
      },
      {
        $addFields: {
          ratings: { $size: "$usersRatings" },
        },
      },
      { $unset: "usersRatings"} 
    ]).skip(+skip).limit(3);

    return res.send(books);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  deleteAuthor,
  updateAuthor,
  getAuthorBooks,
};
