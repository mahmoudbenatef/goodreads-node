const validationErrorMessages = require("../helper/bookValidationMessages");
const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
const validateData = (data, callBackFunction) => {
  let errors = {};
  const { name, image, author, category } = data;

  //validate data
  if (!name) errors["name"] = validationErrorMessages.name;
  if (!image) errors["image"] = validationErrorMessages.image;
  if (!author) errors["author"] = validationErrorMessages.author;
  if (!category) errors["category"] = validationErrorMessages.category;

  // check if the object is empty
  if (isEmptyObject(errors)) errors = null;
  return callBackFunction(errors);
};

module.exports = {
  validateData,
};
