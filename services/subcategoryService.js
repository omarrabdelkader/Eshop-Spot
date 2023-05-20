const subcategoryModel = require("../Models/subcategoryModel");
const slugify = require("slugify");
const apiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

// MIDDLEWARE
exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route -- If we don't post the category in the body
  // We can get it from the params (categoryId)
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc Nest route
// @route GET /api/v1/categories/categoryId/subcategories
// @access Public

// @desc Get subcategories
// @route GET /api/v1/subcategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  // It comes as a string, so we multiply it by 1 so we can convert it into a number
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  // So, if we route in /category/categoryId/subcategories, we will put it in a filterObject as a filteration
  // So, it will find() this specific category in the subcategory collection
  // If not it will find all data in the subcategory collection

  const subcategories = await subcategoryModel
    .find(filterObject)
    .skip(skip)
    .limit(limit);
  res
    .status(200)
    .json({ results: subcategories.length, page, data: subcategories });
});

// @desc Get a specific subcategory
// @route GET /api/v1/subcategories/:id
// @acess Public

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await subcategoryModel.findById(id);

  if (!subcategory) {
    return next(new apiError("No subcategory found", 404));
  }

  res.status(200).json({ data: subcategory });
});

// @desc Create a subcategory
// @route POST /api/v1/subcategories
// @access Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  // Nested route -- If we don't post the category in the body
  // We can get it from the params (categoryId)

  const { name, category } = req.body;

  try {
    const subcategory = await subcategoryModel.create({
      name,
      // CategoryId
      category: category,
      slug: slugify(toString(name)),
    });
    res.status(201).json({ data: subcategory });
  } catch (error) {
    res.status(400).send(error);
  }
});

// @desc Update a subcategory
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.params;

  const subcategory = await subcategoryModel.findByIdAndUpdate(
    {
      _id: id,
    },
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!subcategory) {
    next(new apiError("Subcategory not found", 404));
  }

  res.status(200).json({ data: subcategory });
});

// @desc Delete a subcategory
// @route PUT /api/v1/categories/:id
// @access Private

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await subcategoryModel.findByIdAndDelete(id);
  if (!subcategory) {
    next(new apiError("No subcategory for this ID", 404));
  }
  res.status(204).send({ msg: "Subcategory has been deleted" });
});
