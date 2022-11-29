const mongoose = require("mongoose");
const eventsTemplate = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  relatedTo: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  Owner: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("events", eventsTemplate);
