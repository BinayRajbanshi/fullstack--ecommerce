import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const products = await Product.find({ ...keyword });

  if (products) {
    res.status(200).json(products);
  } else {
    res.status(400);
    throw new Error("products not found");
  }
});

// @desc    Fetch top 3 products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(topProducts);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc    Delete single product
// @route   DELETE /api/products/:id
// @access  Private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.data._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    creates a product review
// @route   PUT /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (item) => item.user.toString() === req.data._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed");
    }
    const review = {
      user: req.data._id,
      name: req.data.name,
      comment,
      review: Number(rating),
    };
    product.reviews = [...product.reviews, review];
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.review + acc, 0) /
      product.numReviews;
    await product.save();
    res.status(200).json({ message: "Product reviewed succesfully" });
  } else {
    res.status(400);
    throw new Error("Product not found");
  }
});
