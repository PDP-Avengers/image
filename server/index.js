require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../client/public"));
// Routes

const usersRoutes = require("./routes/users");
const imageRoutes = require("./routes/images");

app.use("/images", imageRoutes);
app.use("/users", usersRoutes);

const PORT = process.env.PORT || 8000;
function start() {
  const url = process.env.DB;
  mongoose.connect(url, () => {
    console.log("Connect to mongoDb");
  });
  app.listen(PORT, () => {
    console.log(`Server is running port: ${PORT}`);
  });
}

start();
