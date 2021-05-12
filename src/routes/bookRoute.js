const express = require("express");
const Router = express.Router();

// Require controller modules.
const book_controller = require('../controllers/bookController');

//Rate Book.
Router.post("/:bid/rate", book_controller.book_rate );

module.exports = Router;