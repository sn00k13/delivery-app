const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken")

mongoose.connect("mongodb+srv://gocitek:gocitek@cluster0.9cnln.mongodb.net/")
.then(()=> {
    console.log("Connected to MongoDB")
})
.catch((err) =>{
    console.log("Error connecting to MongoDB", err);
});

app.listen(port, () =>{
    console.log("Server is running on port 8000");
});