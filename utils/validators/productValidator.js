// I faced a dependency issue, so I had to use this format
//https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Subcategory = mongoose.model("subcategorySchema");
//
const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");

// getProduct Validator
exports.getProductValidator = [
  // we can set a set of rules in this array
  check("id").isMongoId().withMessage("invalid product id"),
  //   middleware
  validatorMiddleware,
];

// createProduct Validator

exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("Product required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  // --
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  // --
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  // --
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  // --
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),
  // --
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  // --
  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),
  // --
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  //   --
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  // --
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    // This custom validator checks if the category exists in the categoryModel
    // Before we actually post in the product collection
    // We check it by its ID as we post the category's ID in the body
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        console.log(category);
        if (!category) {
          // Please check express-validator's documentaion
          return Promise.reject;
          new Error(`Category has not been found: ${categoryId}`);
        }
      })
    ),
  // --
  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((subcategoryId) => {
      // So, it searches inside of the product collection
      // It checks if this subcategoryId exists in the subcategory collection
      // Subcategory.find({ _id: { $exists: true, $in: subcategoryId } }).then(
      //   (result) => {
      //     console.log(result);
      //     // We need to make sure that the result obj's length == req.body.subcategory obj's length
      //     if (result.length < 1 || result.length != subcategoryId.length)
      //       new Error("subcategory invalid ID");
      //   }
      // );
    }),
  // --
  check("brand").optional().isMongoId().withMessage("Invalid ID formate"),
  //   --
  check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  //
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),

  validatorMiddleware,
];

// updateProduct Validator
exports.updateProductValidator = [
  check("id").isMongoId().withMessage("invalid product id"),
  //   middleware
  validatorMiddleware,
];

// DeleteProduct Validator
exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("invalid product id"),
  //   middleware
  validatorMiddleware,
];
