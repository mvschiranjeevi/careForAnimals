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

router.post("/signup", async (request, response) => {
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(request.body.password, saltPassword);
  const emails = request.body.email;
  try {
    signUpTemplateCopy.findOne({ email: emails }, async (err, value) => {
      if (value) {
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
router.post("/createEvent", auth, async (request, response) => {
  try {
    const users = await signUpTemplateCopy.findOne({ _id: request.user._id });
    const eventCreate = new events({
      eventType: request.body.eventType,
      eventTitle: request.body.eventTitle,
      startDate: request.body.startDate,
      endDate: request.body.endDate,
      image: request.body.image,
      location: request.body.location,
      description: request.body.description,
      relatedTo: request.body.relatedTo,
      Owner: users.userName,
      OwnerEmail: users.email,
    });
    // console.log(eventCreate);
    eventCreate.save();
    response.status(200).json(events);
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});
router.delete("/deleteEvent", auth, async (req, res) => {
  const data = req.query.eventTitle;
  try {
    events.deleteOne({ eventTitle: data }, async (res) => {
      // console.log(res);
    });
  } catch (err) {
    console.log(err);
  }
});
// router.put("/updateEvent",auth,async(req,res)=>{
//   const data=req.body;
//   try{
//     events.findByIdAndUpdate()

//   }catch(err){
//     console.log("ERR",err);
//   }
// })

router.route("/updateEvent").put((req, res, next) => {
  console.log("RESPGAUTAM:", req.body);
  events.updateOne(
    { eventTitle: req.query.eventTitle },
    {
      $set: { description: req.body.description },
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student updated successfully !");
      }
    }
  );
});

// router.put('/updateEvent',async(req,res)=>{
//   const data=req.body;
//   console.log("DATA:",data);
//   try{
//     events.findByIdAndUpdate(req.query.eventTitle,{$set:{
//       location:data.location,
//       description:data.description
//     }},(err,data)=>{
//       if(err){
//         console.log('ERR',err);
//       }else{
//         res.json(data);
//       }
//     })
//   }catch(err){
//     console.log("ERR",err);
//   }
// })

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
        // console.log(securePassword, emails, value._id);
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
      if (value) {
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
    events.find({}, async (err, value) => {
      response.send(value);
    });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

router.get("/seeEvent", auth, async (request, response) => {
  try {
    var events_1 = [];
    participate.find(
      { user_id: request.user._id, participating: true },
      async (err, value) => {
        if (!participate) {
          response.status(400).send("No Events as of now");
        } else {
          var events_id = [];
          for (var x in value) {
            events_id.push(value[x].event_id);
          }
          events.find({ _id: events_id }, async (err, values) => {
            response.send(values);
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

router.get("/getCategories", async (request, response) => {
  try {
    eventType.find({}, async (err, value) => {
      response.status(200).send(value);
    });
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
    // console.log("tag created");
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
      response.status(200).send(res);
    });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

router.get("/getSetOfAnimals", async (request, response) => {
  try {
    const data = await animalInfo
      .find({
        status: { $ne: "" },
        population: { $ne: "" },
      })
      .limit(9);
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

router.post("/participate", auth, async (req, res) => {
  try {
    const id = req.query.id;
    const status = req.query.status;

    const eventsData = await events.findById(id);

    if (!eventsData) return res.status(400).send("Event doesn't exists");

    const participateData = await participate.findOne({
      event_id: eventsData._id,
      user_id: req.user._id,
    });
    console.log(participateData);
    if (!participateData) {
      const temp_arr = new participate({
        user_id: req.user._id,
        event_id: eventsData._id,
        participating: true,
        respondedOn: Date.now(),
      });
      const results = await temp_arr.save();
      return res.send(results);
    } else {
      const flag = participateData.participating;
      participateData["participating"] = status;
      const results = await participateData.save();
      res.send(results);
    }
  } catch (err) {
    console.log("error: ", err);
  }
});

router.get("/participation", auth, async (req, res) => {
  try {
    const id = req.query.id;
    const eventsData = await events.findOne({ _id: id });

    // console.log(eventsData);
    if (!eventsData) return res.status(400).send("Event doesn't exists");
    const event_id = eventsData._id;
    const participateDatas = await participate.find({
      participating: true,
      event_id: event_id,
    });

    const participateData = await participate.find({
      event_id: event_id,
      user_id: req.user._id,
    });
    // console.log(participateDatas.length);
    const total = participateDatas.length;
    // console.log(participateData);
    return res.status(200).send({ data: participateData, total: total });
  } catch (ex) {
    return res.send(ex.message);
  }
});

module.exports = router;
