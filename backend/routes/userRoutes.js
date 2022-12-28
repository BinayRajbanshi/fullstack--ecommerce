import express from "express";
import {
  loginUser,
  register,
  getProfile,
  getUsers,
  updateProfile,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userControllers.js";
import { verifyToken, admin } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", register);
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.get("/", verifyToken, admin, getUsers);
router.delete("/:id", verifyToken, admin, deleteUser);
router.get("/:id", verifyToken, admin, getUserById);
router.put("/:id", verifyToken, admin, updateUser);

export default router;
