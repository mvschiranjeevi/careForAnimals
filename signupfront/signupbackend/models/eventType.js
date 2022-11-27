const mongoose = require("mongoose");
const { date } = require("zod");
const eventType = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    require: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});
module.exports = mongoose.model("eventType", eventType);
