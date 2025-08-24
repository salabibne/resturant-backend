const mongoose = require('mongoose')

const options ={
    autoIndex: false, // Disable auto-indexing in production
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    maxPoolSize: 10, // Maintain up to 10 socket connections
    family: 4, // Use IPv4
}

const connectDB = async()=>{
    console.log("Connecting to Database...")
    try{
        await mongoose.connect(process.env.DATABASE_URL,options)
        console.log("MongoDB Connected successfully")
       
    }catch(err){
        console.log("MongoDB connection failed: "+err.message)
       
    }
    
}


module.exports = connectDB
