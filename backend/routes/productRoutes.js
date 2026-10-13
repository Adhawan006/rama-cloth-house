import express from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Product
router.post("/", protect, createProduct);

// Get All Products
router.get("/", protect, getProducts);

export default router;