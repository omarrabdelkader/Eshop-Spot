const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// getBrand Validator
exports.getBrandValidator = [
  // we can set a set of rules in this array
  check("id").isMongoId().withMessage("invalid brand id"),
  //   middleware
  validatorMiddleware,
];

// createBrand Validator

exports.createBrandValidator = [
  check("name")
    .optional()
    // .withMessage("Brand required")
    .isLength({ min: 3 })
    .withMessage("Brand name is too short")
    .isLength({ max: 32 })
    .withMessage("Brand name is too long"),
  validatorMiddleware,
];

// updateCategory Validator
exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("invalid brand id"),
  //   middleware
  validatorMiddleware,
];

// DeleteCategory Validator
exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("invalid brand id"),
  //   middleware
  validatorMiddleware,
];
