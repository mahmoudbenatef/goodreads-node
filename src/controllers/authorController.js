const userModel = require("../models/userModel.js");
const statusCode = require("../helper/statusCode");
const handler = require("../helper/controllersHelper");
const authorValidator = require("../validators/authorValidator");

const getAllAuthors = async (req, res, next) => {
  const allAuthors = await userModel.find({ role: "author" });
  if (allAuthors.length > 0)
    return res.status(statusCode.Success).json(allAuthors);
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
  authorValidator.validateData(data, async (err) => {
    if (err) return next(err);
    try {
      const newAuthor = await userModel.create({ ...data });
      res.status(statusCode.Created).end();
    } catch (error) {
      next(error);
    }
  });
};
const deleteAuthor = async (req, res, next) => {
  const authorId = req.params.id;
  if (!authorId) handler.handelEmptyData(res);
  try {
    const result = await userModel.findByIdAndDelete({ _id: authorId });
    res.status(statusCode.NoContent).end();
  } catch (error) {
    next(error);
  }
};
const updateAuthor = (req, res, next) => {
  const data = req.body;
  if (!data) handler.handelEmptyData(res);
  authorValidator.validateData(data, async (err) => {
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

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  deleteAuthor,
  updateAuthor,
};
