const EmployeeModel = require("../Models/EmployeeModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    console.log(req.body);
    console.log(req.file, req.file.path);
    const profileImage = req?.file ? req?.file?.path : null;
    body.profileImage = profileImage;
    console.log(body);
    const emp = new EmployeeModel(body);
    await emp.save();
    res.status(201).json({
      message: "Employee created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const skip = (page - 1) * limit;
    let searchCriteria = {};
    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          $options: "i",
        },
      };
    }
    const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);

    const emps = await EmployeeModel.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalPages = Math.ceil(totalEmployees / limit);

    res.status(201).json({
      message: " All Employees ",
      success: true,
      data: {
        employees: emps,
        pagination: {
          totalEmployees,
          currentPage: page,
          totalPages,
          pageSize: limit,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findOne({ _id: id });
    res.status(201).json({
      message: "Get Employee details",
      success: true,
      data: emp,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const deleteEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    await EmployeeModel.deleteOne({ _id: id });
    res.status(201).json({
      message: " Employee deleted",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, department, salary } = req.body;
    console.log(req.body);

    console.log(req.params);
    let updateData = {
      name,
      email,
      phone,
      department,
      salary,
      updatedAt: new Date(),
    };
    console.log(updateData);
    console.log(req.file);
    if (req.file) {
      updateData.profileImage = req.file.path;
    }
    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    console.log(updateEmployee);
    if (!updateEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(201).json({
      message: "Employee updated",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeById,
};
