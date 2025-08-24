const jwt = require('jsonwebtoken'); 
const User = require("../models/user")

// post api/users
const addUser = async(req,res)=>{
    const user = req.body
    try{
        const newUser = await User.create(user)
        res.status(201).json(newUser);
    }
    catch(err){
        res.json({status:"failed",message:err.message})
    }
}

const getUser = async (req, res) => {
    try {
      // Fetch all users
      const users = await User.find({});
      
      // Send the retrieved users as a response
      res.json(users);
    } catch (err) {
      // Catch any errors and send a failure response
      res.status(500).json({
        status: "failed",
        message: err.message,
      });
    }
  };
  


const getUserByEmail = async (req, res) => {
    try {
      const email = req.params.email;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(401).json({ status: "failed", message: "User not found" });
      }
  
      // Check if the user is an admin
      if (user.role !== "admin") {
        return res.status(401).json({ status: "failed", message: "You are not an admin" });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { _id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Send a success response with the token
      res.status(201).json({
        status: "success",
        token,
      });
    } catch (err) {
      // Catch any errors and send a failure response
      res.status(500).json({
        status: "failed",
        message: err.message,
      });
    }
  };


  const isAdmin = async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1]; 
        console.log("token",token)// Extract token from Authorization header
        if (!token) {
            console.log(req.headers)
            return res.status(401).json({ status: "failed", message: "Authorization token is missing" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from database to verify the role
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ status: "failed", message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ status: "failed", message: "Access denied. Admin role required." });
        }

        req.user = user; // Attach user data to the request object
        next(); // Pass control to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ status: "failed", message: "Invalid or expired token" });
    }
  }
  
  const result =async(req,res)=>{
    return res.status(200).json({status:"success",message:"Admin Is Found "})
  }

module.exports= {addUser,getUser,getUserByEmail,isAdmin,result}