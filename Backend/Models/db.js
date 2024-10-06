const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGODB_URI;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MONGODB connected successfully...");
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });
