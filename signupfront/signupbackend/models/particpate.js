const mongoose = require("mongoose");
const { date } = require("zod");
const { User } = require("./user");
const { Events } = require("./events");

const particpate = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participating: {
    type: Boolean,
    default: false,
    require: true,
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Events",
    required: true,
  },
  respondedOn: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("particpate", particpate);
