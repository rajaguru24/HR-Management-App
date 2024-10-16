const UserModel = require("../Models/UserModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { toNamespacedPath } = require("path");

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const user = await UserModel.findOne({ email });
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, email, password: hashPassword });
    console.log(newUser);
    await newUser.save();

    res.status(200).json({ message: "User Registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User Not Registered" });
  }
};

const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userResult = await UserModel.findOne({ email });

    console.log(userResult);
    if (!userResult) {
      return res.status(401).json({ message: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, userResult.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { _id: userResult._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    userResult.token = token;
    await userResult.save();

    res
      .status(200)
      .json({ message: "User Logged in successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "SignIn failed" });
  }
};

const getuser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId);
    res.status(200).json({ message: "Authorized user", user });
  } catch (error) {
    res.status(500).json("Internal server error failed to get user");
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "user not registered" });
  }

  const tokenString = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(tokenString, 12);
  const resetToken = hashedToken.split("/")[0];
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  const resetLink = `http://localhost:5173/resetpassword/${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const message = {
    from: "rajaguru246@gmail.com",
    to: email,
    subject: "Password Reset Request",
    html: `<p>You are requesting for password reset...</p>
           <p> please click this <a href="${resetLink}"> RESET LINK </a> to reset ur password</p>`,
  };

  transporter.sendMail(message, (error) => {
    if (error) {
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
};

const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;
  const { confirmPassword } = req.body;

  try {
    if (newPassword == "" || confirmPassword == "") {
      return res.status(400).json({ message: "Please enter the password " });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    const user = await UserModel.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Token expired" });
    }
    const hashedNewPassword =  await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  signupUser,
  signinUser,
  resetPassword,
  forgotPassword,
  getuser,
};

// if (resetToken) {
//   if (!resetToken) {
//     return res.status(401).json({ message: "incorrect token or expired" });
//   }
//   user.findOne({ resetToken }, (error, user) => {
//     if (error || !user) {
//       return res.status(400).json({ message: "not a user" });
//     }
//     const obj = {
//       password: password1,
//       confirmPassword,
//     };
//   });
// } else {
//   return res.status(400).json({ message: "Authentication error" });
// }

// try {
//   const user = await UserModel.findOne({
//     resetPasswordToken: { $exists: true },
//     resetPasswordExpires: { $gt: Date.now() },
//   });
//   console.log(user);
//   if (!user) {
//     return res.status(400).json({ message: "user not registered" });
//   }
//   await user.findOne({
//     email: req.body.email,
//   });
//   if (resetLink) {
//     const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
//   }

//   if (!isTokenValid) {
//     return res.status(400).json({ message: "Invalid token" });
//   }

//   user.password = await bcrypt.hash(password, 12);
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpires = undefined;
//   res.status(200).json({ message: "Password has been reset" });
