const productModel = require("../models/productModel");
const slugify = require("slugify");
const apiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

// @desc Get products
// @route GET /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
  // It comes as a string, so we multiply it by 1 so we can convert it into a number
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await productModel.find().skip(skip).limit(limit);
  res.status(200).json({ results: products.length, page, data: products });
});

// @desc Get a specific product
// @route GET /api/v1/products/:id
// @acess Public

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById(id);

  if (!product) {
    return next(new apiError("No product found", 404));
  }

  res.status(200).json({ data: product });
});

// @desc Create a product
// @route POST /api/v1/products
// @access Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});

// @desc Update a product
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (req.body.title) req.body.slug = slugify(req.body.title);

  const product = await productModel.findByIdAndUpdate(
    {
      _id: id,
    },
    req.body,
    { new: true }
  );

  if (!product) {
    next(new apiError("Product not found", 404));
  }

  res.status(200).json({ data: product });
});

// @desc Delete a product
// @route PUT /api/v1/products/:id
// @access Private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);
  if (!product) {
    next(new apiError("No product for this ID", 404));
  }
  res.status(204).send({ msg: "Product has been deleted" });
});
