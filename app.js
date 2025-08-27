var cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv").config();

var connectDB = require("./db/connection");

connectDB();

var productRouter = require("./routes/productRoutes");
var orderRouter = require("./routes/orderRoutes");
var reportRouter = require("./routes/reportRoutes");
var queryRouter = require("./routes/queryRoutes");
var categoryRouter = require("./routes/categoryRoutes");
var userRouter = require("./routes/userRoutes");

var app = express();

// app.use((req,res,next)=>{
//     if(req.url === '/favicon.ico'){
//         res.writeHead(204)
//         res.end()
//         return
//     }
//     next()
// })
const corsOptions = {
  origin: ['http://localhost:5173', 'https://resturant-fronend.onrender.com'], // The frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies and credentials
  preflightContinue: false,  // Let CORS handle preflight requests automatically
  optionsSuccessStatus: 200,  // For legacy browsers (especially IE)
};

app.use(cors(corsOptions));  // Enable CORS with the above configuration
app.options('*', cors(corsOptions));  // Enable preflight for all routes




app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.send("Working...");
});
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/query", queryRouter);
app.use("/api/report", reportRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);

//Central error handler
app.use((err,req,res,next)=>{
  console.error(err.stack)
  res.status(err.status || 500).json({
    error:{
      message:err.message || "Internal Server Error"
    }
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
})

module.exports = app;
