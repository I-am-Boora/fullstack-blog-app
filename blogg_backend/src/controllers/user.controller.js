import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(
      "something went wrong while generating access and refresh token !!"
    );
    // res.status(500).json({
    //   message:
    //     "something went wrong while generating access and refresh token !!",
    // });
  }
};

//register user functionality
const registerUser = asyncHandler(async (req, res) => {
  //taking input from frontend
  const { username, fullName, password, email } = req.body;
  // console.log(username);
  console.log(fullName, username, password);
  //check if the field is empty
  if (
    [username, fullName, password, email].some((field) => field?.trim() === "")
  ) {
    console.error("All fields are required !!");
    return res.status(200).json({ message: "all fields are requied" });
  }

  //check if user existed or not
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return res.status(200).json({ message: "user already exists !!" });
  }

  //check image for avatar or
  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(avatarLocalPath);
  // // console.log(avatarLocalPath);
  // if (!avatarLocalPath) {
  //   res.status(300).json({ message: "avatar file path not find" });
  // }
  let avatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files?.avatar[0]?.path;
  }

  //upload file to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  //if file is not uploaded properly
  // if (!avatar) {
  //   res.status(301).json({ message: "file upload failed !!" });
  // }
  const hashedPassword = await bcrypt.hash(password, 10);
  //save user to database
  const user = await User.create({
    fullName,
    avatar: avatar?.url || "",
    email,
    password: hashedPassword,
    username: username.toLowerCase(),
  });

  //create a new user with password and refresh token
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res.status(400).jason({ message: "user registration failed !!" });
  }
  return res
    .status(201)
    .json({ message: "User register successfully !", data: createdUser });
});

//create post
const createPost = asyncHandler(async (req, res) => {
  const { category, title, content, author } = req.body;
  // console.log(category, title, content, author);
  let postLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.photo) &&
    req.files.photo.length > 0
  ) {
    postLocalPath = req.files?.photo[0]?.path;
  }

  const photo = await uploadOnCloudinary(postLocalPath);
  const post = await Post.create({
    title,
    photo: photo?.url || "",
    category,
    content,
    author,
  });
  console.log(post);
  // const posts = await Post.find()
  return res.status(201).json({ message: "Posted", data: post });
});
//get login info
const getLoginInfo = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId).select("-password");
  console.log(user);
  return res.status(200).json({ user });
});
//get all posts
const allPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  // console.log(posts);
  return res.json({ message: "all posts", data: posts });
});

//search post and send it to post detail screen
const searchPost = asyncHandler(async (req, res) => {
  const { Post_Id } = req.body;
  const post = await Post.findById(Post_Id);
  res.status(200).json({ post });
});

//like post
const likePost = asyncHandler(async (req, res) => {
  const { post_id } = req.params;
  const { author } = req.params;

  await Post.findByIdAndUpdate(post_id, {
    $push: { likes: author },
  });

  res.status(200).json({ message: "post liked" });
});
//unlink post
const unLikePost = asyncHandler(async (req, res) => {
  const { post_id } = req.params;
  const { author } = req.params;
  console.log(author);
  const post = await Post.findByIdAndUpdate(post_id, {
    $pull: { likes: author },
  });
  console.log(post);
  res.status(200).json({ message: "post liked" });
});
//comment
const comment = asyncHandler(async (req, res) => {
  const { Post_Id } = req.params;
  // const { commentContent, author } = req.body;
  const post = await Post.findById(Post_Id).populate("comments");
  // await Comment.find({ postID: Post_Id }).populate("author");
  // console.log(post);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  // console.log(post.comments[0].author);
  return res.status(200).json(post);
});

//createComment
const createComment = asyncHandler(async (req, res) => {
  try {
    const { commentContent, Post_Id, author } = req.body;
    const post = await Post.findById(Post_Id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!(commentContent && Post_Id && author)) {
      return res.status(400).json({ message: "Not getting all values" });
    }
    // Create a new comment with the provided content and author
    const newComment = await Comment.create({
      commentContent,
      author,
      postID: Post_Id,
    });

    post.comments.push(newComment);
    await post.save();

    res.status(200).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
  }
});
//user login functionality
const loginUser = asyncHandler(async (req, res) => {
  try {
    //get username or email and password
    const { username, email, password } = req.body;

    //check username or email in not empty
    if (!(username || email)) {
      res.status(400).json({ message: "All fields are required !!" });
    }
    //find in database
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) {
      return res
        .status(300)
        .json({ message: "Username or Email does not exist !!" });
    }

    //check password is validate
    const isPasswordValid = await user.isPasswordCorrect(password);
    // console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res
        .status(300)
        .json({ message: "username and password is incorrect !!" });
    }
    // const token = jwt.sign(process.env.ACCESS_TOKEN_SECRET);
    //generate access and refresh token
    const { accessToken } = await generateAccessAndRefereshTokens(user._id);
    const loggedUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    // const options = {
    //   httpOnly: true,
    //   secure: true,
    // };

    return res.status(200).json({
      accessToken,
      user: loggedUser,
      message: "user login successfully !!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//user logout functionality
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );
  // const options = {
  //   httpOnly: true,
  //   secure: true,
  // };

  return (
    res
      .status(200)
      // .clearCookie("accessToken", options)
      // .clearCookie("refreshToken", options)
      .json({ message: "user logged out !!" })
  );
});

//refresh token update
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

//change current password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "password is not correct !!" });
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: "password change successfully" });
});

//get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json({ user: req.user, message: "User fetched successfully !!" });
});

//update account details
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName } = req.body;

  if (!fullName) {
    return res.status(401).json({ message: "field is required !!" });
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { fullName },
    },
    { new: true }
  ).select("-password");

  return res.status(200).json({ user, message: "name updated" });
});

//update avatar
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    return res.status(400).json({ message: "file path not find !!" });
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar.url) {
    return res.status(400).json({ message: "file not uploaded" });
  }

  const user = await findByIdAndUpdate(
    req.user._id,
    {
      $set: { avatar: avatar.url },
    },
    { new: true }
  ).select("-password");

  return res.status(200).json({ user, message: "profile image update" });
});
export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  createPost,
  allPosts,
  searchPost,
  comment,
  getLoginInfo,
  createComment,
  likePost,
  unLikePost,
};
