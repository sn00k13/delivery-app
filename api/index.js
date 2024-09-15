const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb+srv://gocitek:gocitek@cluster0.9cnln.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const User = require("./models/user");
const Order = require("./models/order");

//function to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport

  const transporter = nodemailer.createTransport({
    //configure the email server
    service: "Gmail",
    auth: {
      user: "gocitek@gmail.com",
      pass: "drtytchbxdjtlylo ",
    },
  });
  //compose email message
  const mailOptions = {
    from: "gobuyme.store",
    to: email,
    subject: "Go Buy Me Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };

  //send the email
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log("Error sending verification email", error)
  }
};

//Endpoint to register in the app
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    //create a new user
    const newUser = new User({ name, email, password });

    //generate and store verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();

    //send verification email to new user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

//Endpoint for verifying the email
app.get("/verify/:token", async(req,res) => {
    try {
        const token = req.params.token;

        //Find the user with the given verification token
        const user = await User.findOne({verificationToken: token})
        if(!user) {
            return res.status(404).json({message: "Invalid verification token"});
        }

        //Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({message: "Email verified successfully!"})
    } catch (error) {
        res.status(500).json({message: "Email verification failed"})
    }
})
