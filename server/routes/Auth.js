// All routes related to user's LOGIN AND REGISTER

const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Route 1  - User Signup
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists, please login" });
    }

    const hashpassword = await bcrypt.hash(data.password, 10);
    const UserData = User({
      name: data.name,
      email: data.email,
      password: hashpassword,
      username: data.email.split("@")[0] + Math.floor(Math.random() * 1000),
      avatar: "https://i.ibb.co/LR39s6h/defaultprofilepic.png",
      bio: `Hello there i am ${
        data.name.split(" ")[0]
      }, i love tech, communities and collaborations. Glad to meet you all 🚀`,
    });

    await UserData.save();
    return res.status(201).json({ message: "Signup successful, please login" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error, try again later" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(409)
        .json({ message: "User not found, please sign up" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = { User: { id: existingUser._id } };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal server error, try again later" });
      }

      return res
        .status(201)
        .json({ token, existingUser, message: "Login successful" });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error, try again later" });
  }
});

module.exports = router;
