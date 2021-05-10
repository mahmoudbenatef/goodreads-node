const express = require("express");
const Router = express.Router();
const authorController = require("../controllers/authorController.js");

Router.get("/", (req, res) => {
  authorController.getAllAuthors(req, res);
});

Router.get("/:id", (req, res) => {
  authorController.getAuthorById(req, res);
});

Router.post("/", (req, res) => {
  authorController.createAuthor(req, res);
});

Router.patch("/:id", (req, res) => {
  authorController.updateAuthor(req, res);
});

Router.delete("/:id", (req, res) => {
  authorController.deleteAuthor(req, res);
});

module.exports = Router;
