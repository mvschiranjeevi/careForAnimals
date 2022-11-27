const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const cors = require("cors");
dotenv.config();

//mongoose.connect(process.env.DATABASE_ACCESS, (err) => {
//  if (err) console.log(err);
//  else console.log("mongdb is connected");
//});

mongoose.connect(
  process.env.DB_PATH,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to mongodb successfully");
});

app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);
app.listen(4000, () => console.log("server is up and running"));