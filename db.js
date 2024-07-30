const mongoose = require("mongoose");
require('dotenv').config();

//Define the mongodb connection URL
const mongoURL = process.env.mongoURL_Local;    //Local Mongodb
// const mongoURL = process.env.mongoURL;       //Online mongodb

//Set up mongodb Connect to the database
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

//Get the default connection
//mongoose maintaine connection reprent the mongodb connection
const db = mongoose.connection;

//Define event listern for data base connection
db.on("connected" , () =>{
    console.log("MongoDB connection sucessfull ");
})

db.on("erroe" , (err) =>{
    console.log("MongoDB connection Error " , err);
})

db.on("disconnected" , () =>{
    console.log("MongoDB not connected ");
})

//Export the module 
module.exports = db;