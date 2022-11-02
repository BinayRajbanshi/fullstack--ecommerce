import express from "express";
import {
  loginUser,
  register,
  getProfile,
  getUsers,
} from "../controllers/userControllers.js";
import { verifyToken, admin } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", register);
router.get("/profile", verifyToken, getProfile);
router.get("/", verifyToken, admin, getUsers);

export default router;
