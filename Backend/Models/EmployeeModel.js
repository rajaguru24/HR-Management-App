const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  department: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  salary: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});
const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
