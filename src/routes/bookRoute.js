const express = require("express");
const Router = express.Router();
const bookController = require("../controllers/bookController");

const reviewRouter = require("./reviewRoute");

Router.get("/", (req, res) => {
  bookController.getAllBooks(req, res);
});

Router.get("/:id", (req, res) => {
  bookController.getBookById(req, res);
});

Router.post("/", (req, res) => {
  bookController.createBook(req, res);
});

Router.patch("/:id", (req, res) => {
  bookController.updateBook(req, res);
});

Router.delete("/:id", (req, res) => {
  bookController.deleteBook(req, res);
});

Router.use("/:bookId/review", reviewRouter);
module.exports = Router;
