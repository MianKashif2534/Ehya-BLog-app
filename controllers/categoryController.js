import Post from "../models/Post.js";
import PostCategories from "../models/PostCategories.js";

const createPostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;

    // Check if category already exists
    const postCategory = await PostCategories.findOne({ title });
    console.log(postCategory);

    if (postCategory) {
      const error = new Error("Category is already created");
      return next(error);
    }

    // Create new category
    const newPostCategory = new PostCategories({ title });

    // Save category to database
    const savedPostCategory = await newPostCategory.save();

    // Return the saved category as a response
    return res.status(201).json(savedPostCategory);
  } catch (error) {
    next(error);
  }
};

const getAllPostCategory = async (req, res, next) => {
  try {
    const postCategories = await PostCategories.find({});
    return res.json(postCategories);
  } catch (error) {
    next(error);
  }
};

// const deletePostCategory = async (req, res, next) => {
//   try {
//     const categoryId = req.params.categoryId;
//     console.log("Category ID: ", req.params.categoryId);

//     await Post.updateMany(
//       { categories: { $in: [categoryId] } },
//       { $pull: { categories: categoryId } }
//     );
//     await PostCategories.deleteOne({ _id: categoryId });
//     res.send({
//       message: "Post is successfully deleted",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const deletePostCategory = async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
  
      // Check if the category exists
      const category = await PostCategories.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      // Remove the category from any posts that include it
      await Post.updateMany(
        { categories: { $in: [categoryId] } }, // Posts with this category
        { $pull: { categories: categoryId } }  // Remove the category from the post
      );
  
      // Delete the category
      await PostCategories.deleteOne({ _id: categoryId });
  
      // Send success response
      return res.status(200).json({
        message: "Category successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };

const updatePostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const postCategory = await PostCategories.findOneAndUpdate(
      //   req.params.catergoryId,
      { _id: req.params.categoryId },
      { title },
      { new: true }
    );

    if (!postCategory) {
      const error = new Error("Category Doesn't Found");
      return next(error);
    }
    return res.json(postCategory);
  } catch (error) {
    next(error);
  }
};

export {
  createPostCategory,
  getAllPostCategory,
  updatePostCategory,
  deletePostCategory,
};
