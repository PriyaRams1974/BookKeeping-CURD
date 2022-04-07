const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const envData = require("./config.json");
const bookRouter = require("./routes/Book.route");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
console.log(port);

app.get("/healthCheck", async (req, res) => {
  console.log("GETTING LOG...it works");
  res.send({ status: "Success" });
  // process.exit(1);
});

mongoose
  .connect("mongodb://localhost:27017/Library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.use(express.json());
app.use("/api/v1/book/", bookRouter);

app.listen(port, () => {
  console.log("server started.... at ", port);
  console.log(`http://127.0.0.1:${port}`);
});
