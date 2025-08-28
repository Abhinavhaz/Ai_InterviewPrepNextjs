const jwt = require("jsonwebtoken");
const User = require("../models/User");


const protect = async (req, res, next) => {

try {
let token = req.headers.authorization

if(token && token.startsWith("Bearer")){
    token = token.split(" ")[1]
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id).select("-password")
    next()
}else{
    res.status(401).json({message:"Not authorized"})
}

    
} catch (error) {
    res.status(401).json({message:"Token failed",error:error.message})
}

}

    module.exports = protect;


    // const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
//     {
//   id: "user123",
//   role: "admin",
//   iat: 1723540060, // issued at (Unix timestamp)
//   exp: 1724144860  // expiry time (Unix timestamp)
// }





// req.User = await User.findById(decoded.id).select("-password")
// await User.findById("66bfa1d4320a2e3d2f9d8e88")
// {
//   "_id": "66bfa1d4320a2e3d2f9d8e88",
//   "name": "John Doe",
//   "email": "john@example.com",
//   "role": "admin",
//   "__v": 0
// }
// This object gets assigned to:
// req.User