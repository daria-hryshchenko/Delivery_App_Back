const express = require("express");
const ctrl = require("./../controllers/products");
const { schemas } = require("./../models/product");
const { validateBody, uploud } = require("./../middlewares");

const router = express.Router();

router.get("/", ctrl.listProducts);

router.post(
  "/",
  uploud.single("image"),
  validateBody(schemas.addSchema),
  ctrl.addProduct
);

module.exports = router;
