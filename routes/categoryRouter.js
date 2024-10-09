// userRouter
import express from "express";
const router = express.Router();
import { adminGuard, authGuard } from "../middleware/authmiddleware.js";
import {
  createPostCategory,
  getAllPostCategory,
  updatePostCategory,
  deletePostCategory,
  getSingleCategory
} from "../controllers/categoryController.js";

router
  .route("/")
  .post(authGuard, adminGuard, createPostCategory)
  .get(getAllPostCategory);

router
  .route("/:categoryId")
  .get(getSingleCategory)
  .put(authGuard, adminGuard, updatePostCategory)
  .delete(authGuard, adminGuard, deletePostCategory);

export default router;
