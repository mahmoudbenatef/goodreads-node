const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    label: {
        type: String,
        maxLength: 20,
        trim: true,
        lowercase: true,
        required: true
    }
});

const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;