const express = require('express')
const router = express.Router()

const Menu = require('../models/MenuItemSchema');



//Post method to sand data
router.post('/', async(req, res) => {
    try {
        const data = req.body;
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log("data sucessfull saved");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal error server" });
    }
})

//Get method get the data for Menu
router.get('/', async(req, res) => {
    try {
        const data = await Menu.find();
        console.log("data sucessfull fetched");
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server not feth the data"})
    }
})

module.exports = router;