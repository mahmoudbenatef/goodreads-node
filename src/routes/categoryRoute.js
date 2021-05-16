const express = require("express")
const {createOne , getAll, deleteOne,updateOne} = require('../controllers/categoryController.js');
const {isAdmin} =require("../middlewares/AdminMiddleware")
Router = express.Router()


Router.route("/").post(isAdmin,createOne).get(getAll)
// Router.route('/:id')


Router.route("/:id").delete(isAdmin,deleteOne).put(updateOne)
module.exports = Router
