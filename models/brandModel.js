// Schema
const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand name is required"],
      unique: [true, "brand name must be unique"],
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
const brandModel = mongoose.model("Brand", brandSchema);

module.exports = brandModel;
