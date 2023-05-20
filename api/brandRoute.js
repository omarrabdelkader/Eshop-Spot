const express = require("express");
const {
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
  createBrandValidator,
} = require("../utils/validators/brandValidator");

const {
  getBrand,
  getBrands,
  createBrand,
  updateBrands,
  deleteBrand,
} = require("../services/brandService");

const router = express.Router();

router.route("/").get(getBrands).post(createBrandValidator, createBrand);

router
  .route("/:id")
  .get(
    // Rules
    getBrandValidator,
    getBrand
  )
  .put(updateBrandValidator, updateBrands)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
