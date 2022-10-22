import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// @desc    logs in the user and saves the token
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // if the user exists
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(403);
    throw new Error("Invalid email or password");
  }
});

// @desc    gets user profiles
// @route   GET /api/users/login
// @access  protected
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.data._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @desc    register new user
// @route   GET /api/users/register
// @access  public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // if user already exists in the database
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(403);
    throw new Error("User already exists");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedpassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(403);
    throw new Error("Unable to create user");
  }
});

// function to generate token of the logged in user
const generateToken = (id) => {
  return jwt.sign({ data: id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};
