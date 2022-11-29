const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/signUpModels");
const events = require("../models/events");
const eventType = require("../models/eventType");
const animalInfo = require("../models/animal");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const config = require("../config/default.json");

router.post("/signup", async (request, response) => {
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(request.body.password, saltPassword);
  const emails = request.body.email;
  console.log(emails);
  try {
    signUpTemplateCopy.findOne({ email: emails }, async (err, value) => {
      // console.log(value);

      if (value) {
        // console.log("zero");
        response.status(409).send({ message: "User is already registerd" });
      } else {
        const signedUpUser = new signUpTemplateCopy({
          fullName: request.body.fullName,
          userName: request.body.userName,
          email: request.body.email,
          password: securePassword,
        });
        signedUpUser.save();
        response.status(200).json(signUpTemplateCopy);
      }
    });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});
router.post("/createEvent", async (request, response) => {
  try {
    const eventCreate = new events({
      eventType: request.body.eventType,
      eventTitle: request.body.eventTitle,
      startDate: request.body.startDate,
      endDate: request.body.endDate,
      picture: request.body.pciture,
      location: request.body.location,
      description: request.body.description,
    });
    eventCreate.save();
    response.status(200).json(events);
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});
const verifyJWT = (request, response, next) => {
  const token = request.header("x-access-token");
  if (!token) {
    response.send("Please send token");
  } else {
    jwt.verify(token, config.jwtPrivateKey, (err, decoded) => {
      if (err) {
        response.send({ auth: false, message: "You failed to authenticate !" });
      } else {
        request.userId = decoded.id;
        next();
      }
    });
  }
};
router.get("/isUserAuth", verifyJWT, (request, response) => {
  response.send("You are Authenicated !!");
});

router.post("/login", async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  signUpTemplateCopy.findOne({ email: email }, async (err, value) => {
    console.log(value);
    if (value) {
      if (await bcrypt.compare(password, value.password)) {
        const id = value.id;
        const token = jwt.sign(
          { _id: value._id, isAdmin: true },
          config.jwtPrivateKey
        );
        response.send({
          message: "Login successfully",
          email: value.email,
          auth: true,
          token: token,
          user_id: value._id,
        });
      } else {
        response.status(409).send({
          message: "Password and confirm password didn't match",
        });
      }
    } else {
      response.status(400).send({ message: "User email does not exist" });
    }
  });
});

router.post("/forgot", async (request, response) => {
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(request.body.password, saltPassword);
  const emails = request.body.email;
  try {
    signUpTemplateCopy.findOne({ email: emails }, async (err, value) => {
      if (value) {
        console.log(securePassword, emails, value._id);
        await signUpTemplateCopy.updateOne(
          { _id: value._id },
          {
            $set: {
              password: securePassword,
            },
          }
        );
        response.status(200).json(signUpTemplateCopy);
      } else {
        response.status(409).send({ message: "User does not exist" });
      }
    });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

router.post("/profile", async (request, response) => {
  const emails = request.body.email;
  try {
    signUpTemplateCopy.findOne({ email: emails }, async (err, value) => {
      console.log(value);

      if (value) {
        console.log("zero");
        response.status(409).send({ message: "User is already registerd" });
      } else {
        const signedUpUser = new signUpTemplateCopy({
          fullName: request.body.fullName,
          userName: request.body.userName,
          email: request.body.email,
          password: securePassword,
        });
        signedUpUser.save();
        response.status(200).json(signUpTemplateCopy);
      }
    });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

router.get("/seeProfile", async (request, response) => {
  const emails = request.query.email;
  try {
    signUpTemplateCopy.findOne({ email: emails }, async (err, value) => {
      response.send(value);
    });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

router.get("/seeEvents", async (request, response) => {
  try {
    // const filters = {
    //   owner: req.body.owner,
    //   eventType: req.body.eventType,
    //   startDate: req.body.startDate,
    //   endDate: req.body.endDate,
    //   createdBy: req.body.createdBy,
    // };
    // const filter = {};

    // for (let key in filters) {
    //   if (filters[key] !== "") {
    //     filter.key = filters[key];
    //   }
    // }

    events.find({}, async (err, value) => {
      console.log(value);
      response.send(value);
    });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

router.get("/getCategories", async (request, response) => {
  try {
    eventType.find({}, async (err, value) => {
      console.log("Get cat", value);
      response.status(200).send(value);
    });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

router.post("/createEvent", async (request, response) => {
  try {
    // const newEvent = new eventType({
    //   eventName: request.body.fullName,
    //   userName: request.body.userName,
    //   email: request.body.email,
    //   password: securePassword,
    // });
    // newEvent.save();
    // response.status(200).json(eventType);
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const tags = await Tag.find();
  res.send(tags);
});

router.post("/tags", async (req, res) => {
  const { error } = validateTag(req.body);
  if (error) return res.status(400).send("enter a valid tag");
  const tag = new Tag({
    name: req.body.name,
  });
  try {
    await tag.save();
    console.log("tag created");
    res.send(_.pick(tag, ["_id", "name", "used"]));
  } catch (err) {
    console.log("err", err);
  }
});

router.get("/animalInfo", async (request, response) => {
  try {
    const name = request.query.animalName;
    const data = await animalInfo.find({ commonName: name });
    try {
      response.send(data);
    } catch (error) {
      response.status(500).send(error);
    }
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

router.get("/getAnimals", async (request, response) => {
  try {
    animalInfo.find({}, async (req, res) => {
      console.log("animals", res);
      response.status(200).send(res);
    });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

router.get("/getSetOfAnimals", async (request, response) => {
  try {
    const data = await animalInfo.find({
    	status: { $ne: '' }, population: { $ne: '' }
    }).limit(9);
    try {
      response.send(data);
    } catch (error) {
      response.status(500).send(error);
    }
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

module.exports = router;
