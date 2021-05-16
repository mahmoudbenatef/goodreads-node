const paginateMode = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // object to carry the pagination result
    const result = {};

    // set the next page
    if (endIndex < (await model.countDocuments().exec())) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }

    // set the previous page
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    // getting the data base on the model
    try {
      result.data = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResult = result;
      next();
    } catch (error) {
      res.status(500).json(error.messages);
    }
  };
};

module.exports = paginateMode;
