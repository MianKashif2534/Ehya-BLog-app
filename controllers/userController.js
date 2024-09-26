// userController

import User from "../models/User.js";
import { fileRemover } from "../utils/fileRemover.js";
import { updatePicture } from "../middleware/uploadpicturemiddleware.js";
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Find the user by email
    let user = await User.findOne({ email });
    // Check if the user already exists
    if (user) {
      throw new Error("User have already registered");
    }
    // Create a new user
    user = await User.create({
      name,
      email,
      password,
    });
    // Respond with the created user data
    res.status(200).json({
      name: user.name,
      email: user.email,
      _id: user._id,
      avatar: user.avatar,
      admin: user.admin,
      verified: user.verified,
      token: await user.generateJwt(),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("Request body:", req.body);
    if (!user) {
      const error = new Error("Email not found");
      error.statusCode = 404;
      return next(error);
    }
    if (await user.comparePassword(password)) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        _id: user._id,
        avatar: user.avatar,
        admin: user.admin,
        verified: user.verified,
        token: await user.generateJwt(),
      });
    } else {
      throw new Error("invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.status(200).json({
        name: user.name,
        email: user.email,
        _id: user._id,
        avatar: user.avatar,
        admin: user.admin,
        verified: user.verified,
      });
    } else {
      let error = new Error("User not found");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      throw new Error("User not found");
    }
    console.log("user");
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.user.password && req.user.password.length < 6) {
      throw new Error("password length must be atleat 6 characters");
    } else if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUserProfile = await user.save();
    res.json({
      _id: updatedUserProfile._id,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      avatar: updatedUserProfile.avatar,
      admin: updatedUserProfile.admin,
      verified: updatedUserProfile.verified,
      token: await user.generateJwt(),
    });
  } catch (error) {
    next(error);
  }
};

// mine
export const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = updatePicture.single("profilePicture");
    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred when uploading: " + err.message
        );
        next(error);
      } else {
        if (req.file) {
          let filename;
          

          // Fetch the user by ID
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;

          // If there is an existing avatar, remove it
          if (filename) {
            fileRemover(filename);
          }
          // console.log("Cropped Image File: ", req.file);
          // Update user's avatar
          updatedUser.avatar = req.file.filename;
          await updatedUser.save();

          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            admin: updatedUser.admin,
            verified: updatedUser.verified,
            token: await updatedUser.generateJwt(),
          });
        } else {
          // No file provided, reset the avatar
          let updatedUser = await User.findById(req.user._id);
          let filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();

          // Remove the old avatar file
          if (filename) {
            fileRemover(filename);
          }

          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            admin: updatedUser.admin,
            verified: updatedUser.verified,
            token: await updatedUser.generateJwt(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
