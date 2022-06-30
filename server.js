require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const fileUpload = require("express-fileupload");
const multer = require("multer");
const uuid = require("uuid").v4;

const path = require("path");
const connectDB = require("./config/db");
const { hashAndSalt, compareEncrypted } = require("./utils/encrypt.util");
const { signedJWT } = require("./utils/jwt.util");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// app.use(fileUpload());
// app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
connectDB();

// mongoose.connect(
//   "mongodb+srv://admin-karan:password123098@cluster0.vhvfy.mongodb.net/PhotosDB",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

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
    cb(null, "client/public");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const id = uuid();
    const filePath = `uploads/${id}${extension}`;
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
  const user = await User.findOne({ _id: userId });
  return res.status(200).json({
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
  if (caption == "") {
    caption = "A Beautiful Memory";
  }
  const { filename, originalname } = req.file;
  console.log({ id, caption, filename, originalname });
  const user = await User.findOne({ _id: id });
  const image = {
    imageUrl: filename,
    caption: caption,
    fileName: originalname,
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

// const photoSchema = new mongoose.Schema({
//   imageURL: String,
//   caption: String,
// });

// const Photo = new mongoose.model("Photo", photoSchema);

// app.post("/upload", function (req, res) {
//   if (!req.files) {
//     return res.status(400).json({ msg: "No files were uploaded" });
//   }

//   const file = req.files.file;
//   const fileCaption = req.body.fileCaption;

//   const photoPost = new Photo({
//     imageURL: `/uploads/${file.name}`,
//     caption: fileCaption,
//   });

//   photoPost.save((err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Saved");
//     }
//   });

//   file.mv(`${__dirname}/build/uploads/${file.name}`, function (err) {
//     if (err) {
//       return res
//         .status(500)
//         .json({ msg500: "There was a problem with the server" });
//     }
//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });

// app.get("/api", (req, res) => {
//   Photo.find({})
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app.get("/*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "client/public/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//         res.send(err);
//       }
//     }
//   );
// });

// app.get("/", (req, res) => {
//   res.redirect("/home");
// });

// app.post("/delete", (req, res) => {
//   const idPost = req.body.id;
//   Photo.deleteOne({ _id: idPost }, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Item deleted successfully");
//     }
//   });
// });

// app.post("/update", (req, res) => {
// let updatedCaption = req.body.updatedCaption;
// const id = req.body.id;
//   if (updatedCaption === "undefined") {
//     const ifCaptionUndefined = req.body.ifCaptionUndefined;
//     updatedCaption = ifCaptionUndefined;
//   }
//   if (updatedCaption === "") {
//     updatedCaption = "A Beautiful Memory";
//   }
//   console.log(updatedCaption);
//   if (req.files === null) {
//     Photo.updateOne(
//       { _id: id },
//       { $set: { caption: updatedCaption } },
//       function (err) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("record updated");
//         }
//       }
//     );
//   } else {
//     const updatedFile = req.files.updatedFile;
//     console.log(updatedFile.name);
//     updatedFile.mv(
//       `${__dirname}/client/public/uploads/${updatedFile.name}`,
//       function (err) {
//         if (err) {
//           return res
//             .status(500)
//             .json({ msg500: "There was a problem with the server" });
//         }
//       }
//     );
//     Photo.updateOne(
//       { _id: id },
//       {
//         $set: {
//           imageURL: `/uploads/${updatedFile.name}`,
//           caption: updatedCaption,
//         },
//       },
//       function (err) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("record updated");
//         }
//       }
//     );
//   }
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(process.env.PORT || 5000, () => {
  console.log("listening at server");
});

// app.set("port", process.env.PORT || 5000);
