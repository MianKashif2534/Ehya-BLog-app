import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';
import connectDB from "./config/db.js";
import userRouter from './routes/userRouter.js'
import postRouter from './routes/postRouters.js'
import commentRouter from './routes/commentRouter.js'
import { errorResponserHandler, invalidPathHandler } from "./middleware/errorHandler.js";
import categoryRouter from './routes/categoryRouter.js'


import cors from 'cors'

// Initialize dotenv and connect to the database
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route to check server status
app.get("/", (req, res) => {
  res.send("Server is running");
});

// User routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/post-categories", categoryRouter);

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, "/uploads")));

// Error handling middleware
app.use(errorResponserHandler);
app.use(invalidPathHandler);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
