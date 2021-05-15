"use strict";
const CategoryModel = require("../models/categoryModel.js");
const BookModel = require("../models/bookModel.js");

const createOne = async (req, res) => {
  console.log(req.body);
  try {
    const doc = await new CategoryModel({ ...req.body }).save();
    res.status(201).json({ data: doc });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOne = async (req, res) => {
  try {
    await CategoryModel.deleteOne({ _id: req.params.id });
    res.status(200).end();
  } catch (err) {
    res.end(err);
  }
};

const updateOne = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  try {
    const category = await CategoryModel.find({ label: req.body.label })
      .lean()
      .exec();
    if (category.length > 0) {
      console.log("here");
      return res
        .status(500)
        .json({ errors: { label: { message: "category is unique" } } });
    }

    const updated = await CategoryModel.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true } // return the new updated
    )
      .lean()
      .exec();
    res.status(201).json({ data: updated });
  } catch (err) {
    res.end(err);
  }
  res.status(200).end();
};

const getAll = async (req, res) => {
  try {
    const categories = await CategoryModel.find({}).lean().exec();

    res.status(201).json({ data: categories });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPopular = async (req, res) => {
  try {
    const categories = await BookModel.aggregate([
      { $group: { _id: "$category", books: { $sum: 1 } } },
      { $sort: { books: -1 } },
      { $limit: 6 },
      { $unset: "books" },
    ]);
    const populatedCategories = await CategoryModel.populate(categories, {path: '_id'});
    res.status(201).json(populatedCategories);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createOne,
  getAll,
  deleteOne,
  updateOne,
  getPopular,
};
