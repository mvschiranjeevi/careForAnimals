const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/signUpModels");
const events = require("../models/events");
const eventType = require("../models/eventType");
const animalInfo = require("../models/animal");
const participate = require("../models/particpate");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const config = require("../config/default.json");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const id = request.query.id;
    const events = await events.findById(id);
    if (!events) return res.status(400).send("Event doesn't exists");
    if ((events.owner = req.user._id))
      return res.status(400).send("You are the owner !!");
    const participate = participate.findOne({
      event_id: events._id,
      user_id: req.user._id,
    });

    if (!participate) {
      const temp_arr = {
        user_id: req.user._id,
        event_id: events._id,
        participating: true,
        respondedOn: Date.now(),
      };
      const results = await participate.save();
      return res.status(200).send("Participating Succcessfully", results);
    } else {
      const flag = participate.participating;
      if (flag === true) {
        participate.participating = false;
      } else {
        participate.participating = true;
      }
      const results = await participate.save();
      return res.status(200).send("responsded Succcessfully", results);
    }
  } catch (err) {
    console.log("error: ", err);
  }
});
router.get("/", async (req, res) => {
  try {
    const id = request.query.id;
    const events = await events.find({ _id: id });
    if (!events) return res.status(400).send("Event doesn't exists");

    const event_id = events._id;
    const participate = await participate.find({
      event_id: event_id,
      user_id: req.user._id,
    });
    return res.status(200).send(participate);
  } catch (ex) {
    return res.send(ex.message);
  }
});
module.exports = router;
