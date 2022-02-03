const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const recipeRoute = require("./routes/recipes");
const categoryRoute = require("./routes/categories");
const imgRoute = require("./routes/upload");
const connectDB = require("./utils");

const PORT = process.env.PORT || 3000;
const app = express();

(async () => {
  dotenv.config();
  app.use(express.json());
  app.use("/images", express.static(path.join(__dirname, "/images")));

  await connectDB();

  app.use("/auth", authRoute);
  app.use("/users", userRoute);
  app.use("/upload", imgRoute);
  app.use("/recipes", recipeRoute);
  app.use("/categories", categoryRoute);
})();

app.listen(PORT, () => {
  const { address } = listener.address();
  console.log("server running : http://%s:%s", address, PORT);
});
