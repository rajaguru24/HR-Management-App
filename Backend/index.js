const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();
var cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 5000;
require("./Models/db");
app.use(bodyParser.json());

const employeeRouter = require("./Routes/employeeRoutes");  
const userRouter = require("./Routes/userRoutes");  

app.get("/", (req, res) => {
  res.send("Employee Management server is running"); 
});
app.use("/api", employeeRouter);
app.use("/api/user", userRouter);


app.listen(PORT, () => {
  console.log("server is running on PORT", PORT);
});
