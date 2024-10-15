const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  resetPasswordToken: String,
  resetPasswordExpires: String,
  newPassword:String,
  confirmPassword:String
});
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
