const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

//Passport username and Password
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // console.log("Recieved Ceredentals:", username, password);
      const user = await Person.findOne({ username });

      if (!user) 
        return done(null, false, { message: "Invalid username." });

      // const isPasswordMatch = await user.password === password ? true : false;
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) 
        return done(null, user);
      else 
        return done(null, false, { message: "Incorrect password" });
    } catch (error) {
      return done(error);
    } 
  })
);


module.exports = passport;
