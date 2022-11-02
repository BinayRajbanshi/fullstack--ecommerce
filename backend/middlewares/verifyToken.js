import jwt from "jsonwebtoken";
import asynchandler from "express-async-handler";
import Users from "../models/userModel.js";

export const verifyToken = asynchandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get the token from headers
      token = req.headers.authorization.split(" ")[1];

      // verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // extract the data from verified token
      const { data } = decoded;
      req.data = await Users.findById(data).select("-password");

      next();
    } catch (error) {
      console.log(error, error.message);
      res.status(401);
      throw new Error("not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("not authorized, no token");
  }
});

export const admin = (req, res, next) => {
  if (req.data && req.data.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};
