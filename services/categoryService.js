const categoryModel = require("../Models/categoryModel");
const slugify = require("slugify");
const apiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

// @desc Get categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async (req, res) => {
  // It comes as a string, so we multiply it by 1 so we can convert it into a number
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await categoryModel.find().skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc Get a specific category
// @route GET /api/v1/categories/:id
// @acess Public

exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);

  if (!category) {
    return next(new apiError("No category found", 404));
  }

  res.status(200).json({ data: category });
});

// @desc Create a category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    const category = await categoryModel.create({ name, slug: slugify(name) });
    res.status(201).json({ data: category });
  } catch (error) {
    res.status(400).send(error);
  }
});

// @desc Update a category
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.params;

  const category = await categoryModel.findByIdAndUpdate(
    {
      _id: id,
    },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    next(new apiError("Category not found", 404));
  }

  res.status(200).json({ data: category });
});

// @desc Delete a category
// @route PUT /api/v1/categories/:id
// @access Private

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  if (!category) {
    next(new apiError("No category for this ID", 404));
  }
  res.status(204).send({ msg: "Category has been deleted" });
});
