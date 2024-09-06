const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 5000;
require("./Models/db");

const EmployeeRouter = require("./Routes/EmployeeRoutes");
app.get("/", (req, res) => {
  res.send("Employee Management server is running"); 
});
app.use("/api/employees", EmployeeRouter);
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log("server is running on PORT", PORT);
});
