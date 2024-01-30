import { Router } from "express";
import {
  allPosts,
  changeCurrentPassword,
  comment,
  createComment,
  createPost,
  getCurrentUser,
  getLoginInfo,
  likePost,
  loginUser,
  refreshAccessToken,
  registerUser,
  searchPost,
  unLikePost,
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
router.route("/posts/:Post_Id").get(comment);
router.route("/createComments").post(createComment);
router.route("/postLike/:post_id/:author").post(likePost);
router.route("/postUnlike/:post_id/:author").post(unLikePost);
router.route("/getUserInfo/:userId").get(getLoginInfo);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
export default router;
