const express = require('express')
const router = express.Router();

const Person = require('./../models/Person');



//Post method to sand the data 
router.post('/' ,  async (req, res) => {
    try {
     const data = req.body
     const newPerson =  new Person(data);
     const response = await newPerson.save();
     console.log("data sucessfull saved");
     res.status(200).json(response)
    } catch (err) {
     console.log(err);
     res.status(500).json({error: "Internal error server"})
    }
})


//Get method get the data for person
router.get('/' ,  async (req, res) => {
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
