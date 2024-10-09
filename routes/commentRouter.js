// commentRouter
import express from "express";
const router = express.Router();
import {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
} from "../controllers/commentController.js";
import { adminGuard, authGuard } from "../middleware/authmiddleware.js";

router
  .route("/")
  .post(authGuard, createComment)
  .get(authGuard, adminGuard, getAllComments);
router
  .route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);

export default router;
