import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { verifyToken, admin } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", verifyToken, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(verifyToken, admin, deleteProduct)
  .put(verifyToken, admin, updateProduct);

export default router;
