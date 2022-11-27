const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
  commonName: {
    type: String,
    required: true
  },
  sciName : {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  imageUrl : {
    type: String,
    default: "NA",
    required: true
  },
  status : {
    type: String,
    default: "NA",
    required: true
  },
  height : {
    type: String
  },
  weight : {
    type: String
  },
  length : {
    type: String
  },
  threatInfo : {
    type: String
  },
  habitats : {
    type: String
  },
  places : {
    type: Array
  },
});

const Animal = mongoose.model("Animal", AnimalSchema, 'animal_info');

module.exports = Animal;