<<<<<<< HEAD
const express = require("express");
const Router = express.Router();
const categoryController = require("../controllers/categoryController");

Router.get("/", (req, res) => {
  categoryController.getAllCategorys(req, res);
});

Router.get("/:id", (req, res) => {
  categoryController.getCategoryById(req, res);
});

Router.post("/", (req, res) => {
  categoryController.createCategory(req, res);
});

Router.patch("/:id", (req, res) => {
  categoryController.updateCategory(req, res);
});

Router.delete("/:id", (req, res) => {
  categoryController.deleteCategory(req, res);
});

module.exports = Router;
=======
const express = require("express")
const {createOne , getAll, deleteOne,updateOne} = require('../controllers/categoryController.js');

Router = express.Router()


Router.route("/").post(createOne).get(getAll)
// Router.route('/:id')


Router.route("/:id").delete(deleteOne).put(updateOne)
module.exports = Router
>>>>>>> handle curd on categories
