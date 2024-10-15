const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors({
  origin: 'https://hr-management-app-brown.vercel.app/', // use your actual domain name (or localhost), using * is not recommended
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin, Content-Type, X-Auth-Token'],
  credentials: true
}))

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
