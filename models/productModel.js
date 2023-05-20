const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Title is too short"],
      maxlength: [100, "Title is too long"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [20, "Description is too short"],
    },
    quantity: {
      type: Number,
      required: [true, "The product's quantity is required"],
    },
    sold: { type: Number, default: 0 },
    price: {
      type: Number,
      required: true,
      trim: true,
      max: [200000, "Price is too long"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    // Array of strings (different colors)
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "An image cover is required for this product"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategories: {
      type: mongoose.Schema.ObjectId,
      ref: "subcategorySchema",
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingAverage: {
      type: Number,
      min: [1, "Rating must above, or equals 1"],
      max: [5, "Rating must be below, or equals 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
