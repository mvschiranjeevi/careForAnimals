const mongoose = require("mongoose");
const signUpTemplate = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  phoneNo: {
    type: Number,
    required: false,
  },
  profilePic: {
    base64: String,
    imageFormat: String,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("users", signUpTemplate);
