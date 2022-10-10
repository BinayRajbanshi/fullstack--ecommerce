import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();
dotenv.config();
connectDB();

app.use("/api/products", productRoutes);
app.use("/api/users", productRoutes);

// case if the user hits the route other than mentioned above
app.use(notFound);

// overriding default error handler that sends error in the form of html
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode in Port ${PORT}`.green.bold
  )
);
