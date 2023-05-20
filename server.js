const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config({ path: "config.env" });
const PORT = process.env.PORT || 8000;
const dbConnection = require("./config/db");
const apiError = require("./utils/apiError");
const categoryRoute = require("./api/categoryRoute");
const subcategoryRoute = require("./api/subcategoryRoute");
const productRoute = require("./api/productRoute");
const brandRoute = require("./api/brandRoute");
const globalError = require("./middlewares/errorMiddleware");

// express app
const app = express();

// db connection
dbConnection();

// middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subcategoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/brands", brandRoute);

app.all("*", (req, res, next) => {
  // creating an error for wrong routes and send it to next middleware (error handling middleware)

  next(new apiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// The server knows that it is an error handling middleware, how? Because of the paramters.
// If an error happens in any previous middleware, like the middlware that loads the categoryRoute
// It will be in the err object
app.use(globalError);

app.listen(PORT, () => {
  console.log("server has started..");
});

// to receive unhandled rejection promises
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Errors: ${err.name} | ${err.message}`);
  process.exit(1);
});
