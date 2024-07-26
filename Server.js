const express = require('express')
const app = express()
const db = require("./db");

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Import the router file
const personRoutes = require('./routes/personRoutes');
const menuRouters = require('./routes/menuRouters');

//Use the routes
app.use('/person', personRoutes); 
app.use('/menu', menuRouters);

app.get('/', function (req, res) {
  res.send('Hello World')
}) 


// app.get('/checken', (req, res) =>{
//     res.send("Hello sir i can help you sir plz tell the problem sir")
// })

// app.get('/chilli', (req, res) => {
//     const chall = {
//         name: "chilli",
//         age: 20,
//         address: "kolkata",
//         price: 250,
//         store: 300
//     }
//     res.send(chall);
// })

// app.get('/a/b/c/d/e/f/g', (req, res) => {
//     res.send("Many times of data in the field ")
// })

// app.post('/post', (req, res) => {
//     res.send("post method is used to send data to the server");
// })

app.listen(3000 , () => {
    console.log("Server run in Port 3000");
})