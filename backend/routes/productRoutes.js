import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productControllers.js";
import { verifyToken, admin } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", verifyToken, admin, createProduct);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(verifyToken, admin, deleteProduct)
  .put(verifyToken, admin, updateProduct);

router.post("/:id/reviews", verifyToken, createProductReview);

export default router;
