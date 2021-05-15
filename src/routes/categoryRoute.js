const express = require("express")
const {createOne , getAll, deleteOne,updateOne,getPopular} = require('../controllers/categoryController.js');

Router = express.Router()


Router.route("/").post(createOne).get(getAll)
// Router.route('/:id')


Router.route("/:id").delete(deleteOne).put(updateOne)

Router.get("/popular", getPopular);

module.exports = Router
