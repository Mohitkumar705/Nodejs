const express = require('express')
const router = express.Router();

const Person = require('./../models/Person');
const {jwtAuthMiddleware,generateToken} = require('./../jwt');
// const { json } = require('body-parser');


 
//Post method to sand the data 
router.post('/signup' ,  async (req, res) => {
    try {
     const data = req.body
     const newPerson =  new Person(data);
     const response = await newPerson.save();
     const payload = {
        id: response.id,
        name: response.name,
     }
     console.log("data sucessfull saved");
     console.log(JSON.stringify(payload));
     const token = generateToken(payload)
     console.log("Token is" , token);
     res.status(200).json({response: response , token: token});
    } catch (err) {
     console.log(err);
     res.status(500).json({error: "Internal error server"})
    }
})

//Login method to the token
router.post('/login', async(req, res) => {
    try {
        //Extract username kand password from request body
        const {username, password} = req.body;
        //Find the user by id
        const user = await Person.findOne({username: username})
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: "Invalid username or password"})
        } 
        
        const payload = {
            //generate token
            id: user.id,
            name: user.name,
        }
        const token = generateToken(payload)
        //return token as response
        res.json({token: token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal error server"})
    }
});

//Profile route
router.get('/profile',  async (req, res) => {
    try {
        const userData = req.user;
        console.log('User Data', userData);
        const userId = userData.id;
        const user = await Person.findById(userId) 
        res.status(200).json({user})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal error server"})
    }
})


//Get method get the data for person
router.get('/',  async (req, res) => {
    try {
        const data = await Person.find();
        console.log("data sucessfull fetched");
        res.status(200).json(data);
    }  
    catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal error data not fetched"})
    }
})


router.get('/:workType' , async (req, res) => {
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter')
        {
            const response = await Person.find({work: workType})
            console.log("data sucessfull fetched");
            res.status(200).json(response)
        }
        else {
            res.status(400).json({error: "Invalid work type"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal error data not fetched"})
    }
}) 


//Update operation perform in Nodejs
router.put('/:id', async (req, res) => {
    try {
        const personID = req.params.id;
        const data = req.body;
        const response = await Person.findByIdAndUpdate(personID, data, {
            new: true,
            runValidators: true
        })
        if(!response)
        {
            res.status(404).json({error: "Person not found"})
        }
        console.log("Data sucessfull Update");
        res.status(200).json(response)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal error data not updated"});
    }
})

//Delete operation perform
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //Extract the person id in the url

        //Asuming you have a person modul
        const response = await Person.findByIdAndDelete(personId);
        if(!response)
        {
            res.status(404).json({error: "Person not found"})
        }
        console.log("Data sucessfull deleted");
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal error data not Deleted"});
    }
})

//only for check the commit
module.exports = router;
