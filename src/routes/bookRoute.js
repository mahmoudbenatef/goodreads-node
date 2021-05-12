const express = require("express");
const Router = express.Router();
const bookController = require("../controllers/bookController");

const reviewRouter = require("./reviewRoute");

Router.get("/", (req, res, next) => {
  bookController.getAllBooks(req, res, next);
});

Router.get("/:id", (req, res, next) => {
  bookController.getBookById(req, res, next);
});

Router.post("/", (req, res, next) => {
  bookController.createBook(req, res, next);
});

Router.patch("/:id", (req, res, next) => {
  bookController.updateBook(req, res, next);
});

Router.delete("/:id", (req, res, next) => {
  bookController.deleteBook(req, res, next);
});

Router.use("/:bookId/review", reviewRouter);
module.exports = Router;
