import express from "express";
import {
  loginUser,
  register,
  getProfile,
} from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", register);
router.get("/profile", verifyToken, getProfile);

export default router;
