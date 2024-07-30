const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  }, 
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    require: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  }
});

personSchema.pre("save", async function (next) {
  const person = this;
  //Hash the password is if hass been modifier or new
  if (!person.isModified('password')) return next();
  try {
    //hash password generate
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    //override the plain password with the hased one
    person.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        //use bcrypt to compare the provided password with the hased password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw(error)
    }
}


//create person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
