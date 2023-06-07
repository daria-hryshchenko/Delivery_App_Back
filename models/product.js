const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("./../helpers");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.string().required(),
  image: Joi.string(),
  brand: Joi.string().required(),
});

const schemas = {
  addSchema,
};

const Product = model("product", productSchema);

module.exports = {
  Product,
  schemas,
};
