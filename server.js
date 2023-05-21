require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const multer = require("multer");
const uuid = require("uuid").v4;

const path = require("path");
const connectDB = require("./config/db");
const { hashAndSalt, compareEncrypted } = require("./utils/encrypt.util");
const { signedJWT } = require("./utils/jwt.util");

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());


// build code
app.use(express.static(path.join(__dirname, "client", "build")));
if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
  // app.use(express.static("client/build"));
  app.use(express.static(path.join(__dirname, "client", "build")));
}

// connection with the database
connectDB();

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    gallery: [
      {
        imageUrl: {
          type: String,
        },
        caption: {
          type: String,
        },
        fileName: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "client/build");
  },
  filename: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    const id = uuid();
    const filePath = `images/${id}${extension}`;
    cb(null, filePath);
  },
});

const upload = multer({ storage: storage });

const signedUserJwt = async (userId) => {
  return signedJWT({
    user: {
      id: userId,
    },
  });
};

app.get("/api/v1/user", async (req, res) => {
  const { userId } = req.query;
  console.log(req.query);
  const user = await User.findOne({ _id: userId });
  console.log(user);
  return res.status(200).json({
    success: "Information fetched",
    gallery: user.gallery,
  });
});

app.post("/api/v1/auth/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({
      error: "User Already exists",
    });
  } else {
    const newUser = new User({
      email: email,
      password: await hashAndSalt(password),
    });
    await newUser.save();
    return res.status(200).json({
      success: "Successful SignUp",
      user: {
        gallery: newUser.gallery,
        id: newUser._id,
      },
      token: await signedUserJwt(newUser._id),
    });
  }
});

app.post("/api/v1/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({
      error: "Incorrect Information",
    });
  } else {
    const isMatch = await compareEncrypted(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Incorrect Information",
      });
    } else {
      return res.status(200).json({
        success: "Successful Login",
        user: {
          gallery: user.gallery,
          id: user._id,
        },
        token: await signedUserJwt(user._id),
      });
    }
  }
});

app.post("/api/v1/upload", upload.single("image"), async (req, res) => {
  let { id, caption } = req.body;
  console.log({ id, caption });
  if (caption == "" || caption == undefined || caption == null) {
    caption = "A Beautiful Memory";
  }
  const filePath = req.file.filename;
  const fileName = req.body.fileName
    ? req.body.fileName + ".png"
    : req.file.originalname;
  const user = await User.findOne({ _id: id });
  const image = {
    imageUrl: filePath,
    caption: caption,
    fileName: fileName,
  };
  let gallery = user.gallery;
  gallery.push(image);
  user.gallery = gallery;
  user.save();
  res.status(200).json({
    success: "Photo added successfully",
    gallery: user.gallery,
  });
});

app.post("/api/v1/update", upload.single("image"), async (req, res) => {
  const { id, caption, imageId } = req.body;
  let fileName = null,
    filePath = null;
  if (req.file) {
    filePath = req.file.filename;
    fileName = req.file.originalname;
  }
  const user = await User.findOne({ _id: id });
  let image;
  for (let i = 0; i < user.gallery.length; i++) {
    if (user.gallery[i]._id == imageId) {
      image = user.gallery[i];
      image.caption = caption;
      if (filePath) {
        image.fileName = fileName;
        image.imageUrl = filePath;
      }
    }
  }
  user.save();
  return res.status(200).json({
    update: image,
  });
});

app.delete("/api/v1/delete", async (req, res) => {
  console.log(req.query, req.body);
  const { userId, imageId } = req.query;
  const user = await User.findOne({ _id: userId });
  let image;
  for (let i = 0; i < user.gallery.length; i++) {
    if (user.gallery[i]._id == imageId) {
      image = user.gallery[i];
      user.gallery.splice(i, 1);
      break;
    }
  }
  user.save();
  return res.status(200).json({
    deleted: image,
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("listening at server");
});
