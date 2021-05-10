const express = require("express");
const Router = express.Router();
const reviewController = require("../controllers/reviewController");

Router.get("/", (req, res) => {
  reviewController.getAllReviews(req, res);
});

Router.get("/:id", (req, res) => {
  reviewController.getReviewById(req, res);
});

Router.post("/", (req, res) => {
  reviewController.createReview(req, res);
});

Router.patch("/:id", (req, res) => {
  reviewController.updateReview(req, res);
});

Router.delete("/:id", (req, res) => {
  reviewController.deleteReview(req, res);
});

module.exports = Router;
