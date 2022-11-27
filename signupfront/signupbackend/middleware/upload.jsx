const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const { options } = require("../../signupbackend/routes/routes");
const storage = new GridFsStorage({
  url: process.env.DATABASE_ACCESS,
  options: { userNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimtype) === -1) {
      const filename = `${Date.now()}-any-name-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-any-name-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
