const {
  createEmployee,
  getAllEmployees,
  deleteEmployeeById,
  getEmployeeById,
  updateEmployeeById,

} = require("../Controllers/EmployeeController.js");
const {cloudinaryFileUploader}=require('../Middlewares/FileUploader.js')
const router = require("express").Router();

router.post("/", cloudinaryFileUploader.single('profileImage'), createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", cloudinaryFileUploader.single('profileImage'),  updateEmployeeById);
router.delete("/:id", deleteEmployeeById);


module.exports = router;
