const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  stars: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  review: {
    type: String,
    maxLength: 5000,
    trim: true,
  },
});

const rateModel = mongoose.model("Rate", rateSchema);

module.exports = {
  rateModel,
  rateSchema,
};
