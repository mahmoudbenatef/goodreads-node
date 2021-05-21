const userBookModel = require("../models/userBookModel");
const statusCode = require("../helper/statusCode");
const BookModel = require("../models/bookModel");
const UserModel = require("../models/userModel");

const getAllBooks = async (req, res) => {
  if (req.paginatedResult.data.length > 0)
  return res.status(200).json(req.paginatedResult); // collection has data
return res.status(500).end(); // collection is empty
};
const getBookById = (req, res) => {};
const addNewBook = (req, res) => {};
const editBook = (req, res) => {};
const deleteBook = (req, res) => {};
const changeBookShelf = (req, res) => {};
const getBookShelve = async(req,res)=>{
  try{
  const shelveStatus =  await  userBookModel.findOne({book:req.params.bookId, user:req.params.userId}).select({shelf:1,rating:1})
  res.status(200).json({data:shelveStatus})
}
catch(err){
  res.end(err)
}
}

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  editBook,
  deleteBook,
  changeBookShelf,
  getBookShelve
};
