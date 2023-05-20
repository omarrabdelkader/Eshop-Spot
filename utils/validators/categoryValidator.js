const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// getCategory Validator
exports.getCategoryValidator = [
  // we can set a set of rules in this array
  check("id").isMongoId().withMessage("invalid category id"),
  //   middleware
  validatorMiddleware,
];

// createCategory Validator

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Category name is too short")
    .isLength({ max: 32 })
    .withMessage("Category name is too long"),
  validatorMiddleware,
];

// updateCategory Validator
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id"),
  //   middleware
  validatorMiddleware,
];

// DeleteCategory Validator
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id"),
  //   middleware
  validatorMiddleware,
];
