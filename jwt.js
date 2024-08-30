const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //First check request header has authorization or not
  const authorization = req.headers.authorization;
  if(!authorization) return res.status(401).json({error :"Token not found"})
  //Extract the jws token from the request header
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    //Verify the jwt token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Internal server" });
  }
};

//Function the generate token
const generateToken = (userData) => {
    //Generate a new jwt token using user data
    return jwt.sign( userData , process.env.SECRET_KEY , {expiresIn: 9000})
    }
module.exports = {jwtAuthMiddleware,generateToken}; 