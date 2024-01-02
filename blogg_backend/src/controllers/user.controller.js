import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    res.status(500).json({
      message:
        "something went wrong while generating access and refresh token !!",
    });
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //taking input from frontend
  const { username, fullName, password, email } = req.body;
  // console.log(username);

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
const loginUser = asyncHandler(async (req, res) => {
  try {
    //get username or email and password
    const { username, email, password } = req.body;
    console.log(req.body.email, password);
    //check username or email in not empty
    if (!(username || email)) {
      res.status(400).json({ message: "All fields are required !!" });
    }
    //find in database
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) {
      return res
        .status(300)
        .json({ message: "User or Email does not exist !!" });
    }

    //check password is validate
    const isPasswordValid = await user.isPasswordCorrect(password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res
        .status(300)
        .json({ message: "username and password is incorrect !!" });
    }

    //generate access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
    );

    const loggedUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: loggedUser,
        accessToken,
        refreshToken,
        message: "user login successfully !!",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
export { registerUser, loginUser };
