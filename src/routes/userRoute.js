const express = require("express"),
    Router = express.Router(),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt')

var userHandlers = require('../controllers/userController.js');

console.log("here")
Router.post("/register"
    , (req, res) => {
        userHandlers.register(req, res)
    })


Router.post("/signin"
    , (req, res) => {
        userHandlers.sign_in(req, res)
    })

Router.get("/"
    , async (req, res) => {
        userHandlers.users(req, res)
    })

Router.post("/search"
    , (req, res) => {
        userHandlers.search(req, res)
    })

Router.patch("/:id", (req, res) => {
    userHandlers.edit(req, res)
})

Router.get("/:id", (req, res) => {
    userHandlers.getUser(req, res)
})

Router.delete("/:id", (request, response) => {
    userHandlers.delete(request, response)
})

module.exports = Router
