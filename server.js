require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
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
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "build")));
connectDB();

// mongoose.connect(
//   "mongodb+srv://admin-karan:password123098@cluster0.vhvfy.mongodb.net/PhotosDB",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// mongoose.connect("mongodb://localhost:27017/PhotoDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    gallery: [
      {
        imageUrl: String,
        caption: String,
      },
    ],
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

const signedUserJwt = async (userId) => {
  return signedJWT({
    user: {
      id: userId,
    },
  });
};

app.post("/api/v1/auth", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password);
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
      token: await signedUserJwt(newUser._id),
    });
  }
});

app.post("/api/v1/auth/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({
      error: "Incorrect Information",
    });
  } else {
    const isMatch = await compareEncrypted(password, user.password);
    if (!isMatch) {
      console.log("2");
      return res.status(400).json({
        error: "Incorrect Information",
      });
    } else {
      console.log("3");
      return res.status(200).json({
        success: "Successful Login",
        token: await signedUserJwt(user._id),
      });
    }
  }
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
