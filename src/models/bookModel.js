const mongoose = require("mongoose");
const { rateSchema } = require("../models/rateModel");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 200,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxLength: 2000,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  avgRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  rate: [rateSchema],
});

// set the avrage rate for book dynamic
bookSchema.pre("save", function () {
  this.avgRating = this.getAvarageRate();
});

bookSchema.methods.getAvarageRate = function () {
  // get total count of rate
  const totalRateCount = this.rate.length;
  // get the totalStart this book tooke
  const totalStarAmout = [...this.rate].reduce((base, rate) => {
    base += rate.stars;
    return base;
  }, 0);

  return totalStarAmout / totalRateCount;
};
const BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;
