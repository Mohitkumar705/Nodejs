const mongoose = require("mongoose");

//Define the mongodb connection URL
const mongoURL = "mongodb://localhost:27017/hotels";

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