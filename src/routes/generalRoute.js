const express = require("express");
const Router = express.Router({ mergeParams: true });
const bookController = require("../controllers/bookController");
const categoryController = require("../controllers/categoryController");


Router.get("/popular/books",bookController.getPopular);

Router.get("/popular/categories", categoryController.getPopular);

Router.get("/popular/authors", );

module.exports = Router;
