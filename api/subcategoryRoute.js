const express = require("express");
const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
} = require("../services/subcategoryService");

// Allows you to access parameters from another route (categoryRoute)
// An example of this: we want to access the categoryId from the categoryRoute
const router = express.Router({ mergeParams: true });

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subcategoryValidator");

router
  .route("/")
  // setCategoryIdToBody is set before the validator as the validator prevents
  // the function to take an action, so we put it in a middleware before the validator
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategory, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
