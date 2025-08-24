const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ingredients:[ new mongoose.Schema({
        product_id:{
            type:mongoose.ObjectId, 
            ref:'Product', 
            reqquired:true
        },
        quantity:{
            type:Number,
            required:true
    }
},{
    _id:false
})],

})