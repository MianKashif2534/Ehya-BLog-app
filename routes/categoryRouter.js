// userRouter
import express from "express";
const router = express.Router();
import { adminGuard, authGuard } from "../middleware/authmiddleware.js";
import {
  createPostCategory,
  getAllPostCategory,
  updatePostCategory,
  deletePostCategory,
} from "../controllers/categoryController.js";

router
  .route("/")
  .post(authGuard, adminGuard, createPostCategory)
  .get(getAllPostCategory);

router
  .route("/:categoryId")
  .put(authGuard, adminGuard, updatePostCategory)
  .delete(authGuard, adminGuard, deletePostCategory);

export default router;
