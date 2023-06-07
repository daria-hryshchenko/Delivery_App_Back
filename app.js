const express = require("express");
const cors = require("cors");
require("dotenv").config();
const productsRoutes = require("./routes/products");

const { DB_HOST } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", productsRoutes);

app.get("/", (req, res) => {
  res.json("success");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;