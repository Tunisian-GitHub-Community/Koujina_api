const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require ("./routes/auth")

const app = express();
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  app.use("/auth", authRoute);


app.listen("5000", () => {
    console.log("Backend is running")
})