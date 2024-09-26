// postRouter
import express from "express";
const router = express.Router();
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPost
} from "../controllers/postController.js";
import { authGuard, adminGuard } from "../middleware/authmiddleware.js";

router.route("/").post( authGuard, adminGuard, createPost).get(getAllPost);

router
  .route("/:slug")
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost)

export default router;
