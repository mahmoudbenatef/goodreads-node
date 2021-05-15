const express = require("express");
const Router = express.Router();
const bookController = require("../controllers/bookController");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

Router.get("/", (req, res, next) => {
  bookController.getAllBooks(req, res, next);
});

Router.get("/:id", (req, res, next) => {
  bookController.getBookById(req, res, next);
});

Router.post("/", upload.single("image"), (req, res, next) => {
  bookController.createBook(req, res, next);
});

Router.patch("/:id", upload.single("image"), (req, res, next) => {
  bookController.updateBook(req, res, next);
});

Router.delete("/:id", (req, res, next) => {
  bookController.deleteBook(req, res, next);
});

Router.post("/:id/rate", bookController.rateBook);

Router.post("/:id/shelve", bookController.shelveBook);

module.exports = Router;
