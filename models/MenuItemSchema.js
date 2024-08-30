const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    test: {
        type: String,
        enum: ['sweet','spicy',"cher"],
        require: true,
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingregent: {
        type: String,
        default:[]
    },
    num_salary: {
        type: Number,
        default: 0
    }

})
const MenuItemSchema = new mongoose.model('MenuItem', MenuSchema);
module.exports = MenuItemSchema;   