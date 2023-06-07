const fs = require("fs/promises");
const path = require("path");

const { Product } = require("./../models/product");

const { uploud } = require("./../middlewares/index");

const { ctrlWrapper } = require("./../helpers/index");

const imagesDir = path.join(__dirname, "../", "public", "image");

const listProducts = async (req, res) => {
  const data = await Product.find({}, "-createdAt -updatedAt");
  res.json(data);
};

const addProduct = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const filename = `${originalname}`;
  const resultUpload = path.join(imagesDir, filename);
  await fs.rename(tempUpload, resultUpload);
  req.body.image = resultUpload;
  const avatarURL = path.join("image", filename);
  const product = new Product({ ...req.body, image: `/image/${filename}` });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
};

module.exports = {
  listProducts: ctrlWrapper(listProducts),
  addProduct: ctrlWrapper(addProduct),
};
