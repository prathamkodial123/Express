const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserInfo = require("../models/userInfo");
const userInfo = require("../models/userInfo");

//@desc Register a user
//@route POST /api/users/register
//@access publicRequest failed with status code 400
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fName, lName, gender, mobileNo, address } = req.body;
  if (!username || !email || !password || !fName || !gender || !mobileNo || !address) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await UserInfo.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }
  const userInfo = await UserInfo.create({ fName, lName, email, gender, mobileNo, address });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ userId: userInfo.id, username, password: hashedPassword });
  if (user) {
    res.status(201).json({ _id: user.id });
  } else {
    res.status(400).json({ message: "User data is not valid" });
  }
});

const getUsername = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (username) {
    const userAvailable = await User.findOne({ username });
    if (userAvailable) {
      res.status(200).json({ id: userAvailable._id });
    } else {
      res.status(200).json();
    }
  } else {
    res.status(400);
    throw new Error("Username is required.");
  }
});
const exitsEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (email) {
    const userAvailable = await UserInfo.findOne({ email });
    if (userAvailable) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } else {
    res.status(400);
    throw new Error("Email is required.");
  }
});

const exitsUsername = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (username) {
    const userAvailable = await User.findOne({ username });
    if (userAvailable) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } else {
    res.status(400);
    throw new Error("Username is required.");
  }
});
const exitsMobileNo = asyncHandler(async (req, res) => {
  const { mobileNo } = req.body;
  if (mobileNo) {
    const userAvailable = await userInfo.findOne({ mobileNo });
    if (userAvailable) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } else {
    res.status(400);
    throw new Error("Mobile No is required.");
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15d" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, getUsername ,exitsEmail, exitsUsername, exitsMobileNo, loginUser, currentUser };
