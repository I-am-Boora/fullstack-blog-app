import { Router } from "express";
import {
  allPosts,
  changeCurrentPassword,
  comment,
  createPost,
  getCurrentUser,
  getLoginInfo,
  loginUser,
  refreshAccessToken,
  registerUser,
  searchPost,
  updateAccountDetails,
  updateUserAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

// import cors from "cors";
// import express from "express";
// const app = express();
// app.use(cors());

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/createPost").post(
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
  ]),
  createPost
);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/allPosts").get(allPosts);
router.route("/searchPost").post(searchPost);
router.route("/comment").post(comment);
router.route("/getUserInfo/:token").get(getLoginInfo);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
export default router;
