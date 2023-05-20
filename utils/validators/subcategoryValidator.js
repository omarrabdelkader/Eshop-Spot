const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// getSubCategory Validator
exports.getSubCategoryValidator = [
  // we can set a set of rules in this array
  check("id").isMongoId().withMessage("invalid subcategory id"),
  //   middleware
  validatorMiddleware,
];

// createCategory Validator

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("SubCategory name is too short")
    .isLength({ max: 32 })
    .withMessage("SubCategory name is too long"),
  check("category")
    .notEmpty()
    .withMessage("It is empty")
    .isMongoId()
    .withMessage("invalid category id"),
  validatorMiddleware,
];

// updateSubCategory Validator
exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid subcategory id"),
  //   middleware
  validatorMiddleware,
];

// DeleteSubCategory Validator
exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid subcategory id"),
  //   middleware
  validatorMiddleware,
];
