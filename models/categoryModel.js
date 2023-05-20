// Schema
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category is required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Must be at least 3 characterS"],
      maxlength: [32, "Must be max 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

// Model
const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
