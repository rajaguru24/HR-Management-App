const UserModel = require("../Models/UserModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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

  const resetToken = crypto.randomBytes(32).toString("hex");
  let hashedToken = await bcrypt.hash(resetToken, 12);
  hashedToken = hashedToken
    .replace(/\//g, "g")
    .replace(/\+/g, "-")
    .replace(/=/g, "");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  const resetLink = `https://hr-management-app-chi.vercel.app/resetpassword/${hashedToken}`;
  console.log(resetLink);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    secure: true,
    port: 465,
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
    to: user.email,
    subject: "Password Reset Request",
    html: `<p>You are requesting for password reset...</p>
           <p> please click this <a href="${resetLink}"> RESET LINK </a> to reset ur password</p>`,
  };
  console.log(message);
  transporter.sendMail(message, (error) => {
    if (error) {
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
};

const resetPassword = async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;
  const { token } = req.params;
  console.log(token);
  console.log(req.body);

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Password Does not match" });
    }
    const user = await UserModel.findOne({ resetPasswordToken: token });
    console.log(user);
    if (!user) {
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(confirmPassword, saltRounds);
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupUser,
  signinUser,
  resetPassword,
  forgotPassword,
  getuser,
};
