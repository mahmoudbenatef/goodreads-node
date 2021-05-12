const categoryModel = require("../models/categoryModel");

const getAllCategorys = async (req, res) => {
  const all = await categoryModel.find();
  return res.json(all);
};
const getCategoryById = (req, res) => {};
const createCategory = (req, res) => {
  categoryModel.create({ ...req.body }, (err, data) => {
    if (err) return res.json("error");
    return res.json(data);
  });
};
const editCategory = (req, res) => {};
const deleteCategory = (req, res) => {};
const updateCategory = (req, res) => {};

module.exports = {
  getAllCategorys,
  getCategoryById,
  createCategory,
  editCategory,
  deleteCategory,
  updateCategory,
};
