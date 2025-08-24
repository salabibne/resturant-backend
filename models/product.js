const mongoose = require('mongoose')
const {CATEGORIES} = require('../constant/constant') 

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum:{
            values: Object.values(CATEGORIES),
            message:"{VALUE} is not a valid category."
        },
        required:true
    },
    stock_quantity:{
        type:Number,
        default:0
    }

},
{
    timestamps:true
})



const productModel = mongoose.model("Product",productSchema)
module.exports = productModel