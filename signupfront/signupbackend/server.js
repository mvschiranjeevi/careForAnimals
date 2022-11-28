const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const users = require("./routes/users");
const posts = require("./routes/posts");
const tags = require("./routes/tags");
const replies = require("./routes/replies");
const config = require("config");

dotenv.config();

app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

mongoose.connect(process.env.DATABASE_ACCESS, (err) => {
  if (err) console.log(err);
  else console.log("mongdb is connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
// mongoose.connect(process.env.DATABASE_ACCESS, () =>
//   console.log("Database Connected")
// );

app.get("/", (req, res) => {
  res.send("request successfully sent!");
});
app.use("/users", users);
app.use("/posts", posts);
app.use("/tags", tags);
app.use("/reply", replies);
app.use(express.json());
app.use("/app", routesUrls);
app.listen(4000, () => console.log("server is up and running"));
