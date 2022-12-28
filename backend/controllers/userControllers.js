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

// @desc    gets user's profile
// @route   GET /api/users/profile
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

// @desc    updates user profile
// @route   PUT /api/users/profile
// @access  protected
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.data._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      // hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedpassword;
    }

    const updatedProfile = await user.save();

    res.status(200).json({
      _id: updatedProfile._id,
      name: updatedProfile.name,
      email: updatedProfile.email,
      isAdmin: updatedProfile.isAdmin,
      token: generateToken(updatedProfile._id),
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @desc    gets user allUsers
// @route   GET /api/users
// @access  private/ADMIN
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    deletes user
// @route   DELETE /api/users/:id
// @access  private/ADMIN
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  res.json(user._id);
});

// @desc    Gets user by id
// @route   GET /api/users/:id
// @access  private/ADMIN
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc  update user by admin
// @route /api/users/:id
// @access private/admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
