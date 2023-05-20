const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "Subcategory already exists"],
      minlength: [3, "Subcategory is too short"],
      maxlength: [32, "Subcategory is too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      // CategoryId will be posted in the creation
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Subcategory must be related to a category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subcategorySchema", subcategorySchema);
