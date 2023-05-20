const brandModel = require("../models/brandModel");
const slugify = require("slugify");
const apiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

// @desc Get brands
// @route GET /api/v1/brands
// @access Public
exports.getBrands = asyncHandler(async (req, res) => {
  // It comes as a string, so we multiply it by 1 so we can convert it into a number
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await brandModel.find().skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

// @desc Get a specific brand
// @route GET /api/v1/brand/:id
// @acess Public

exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findById(id);

  if (!brand) {
    return next(new apiError("No brand found", 404));
  }

  res.status(200).json({ data: brand });
});

// @desc Create a brand
// @route POST /api/v1/brands
// @access Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    const brand = await brandModel.create({ name, slug: slugify(name) });
    res.status(201).json({ data: brand });
  } catch (error) {
    res.status(400).send(error);
  }
});

// @desc Update a brand
// @route PUT /api/v1/brands/:id
// @access Private
exports.updateBrands = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.params;

  const brand = await brandModel.findByIdAndUpdate(
    {
      _id: id,
    },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    next(new apiError("Brand not found", 404));
  }

  res.status(200).json({ data: brand });
});

// @desc Delete a brand
// @route PUT /api/v1/brand/:id
// @access Private

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findByIdAndDelete(id);
  if (!brand) {
    next(new apiError("No brand for this ID", 404));
  }
  res.status(204).send({ msg: "Brand has been deleted" });
});
