const mongoose = require('mongoose')

const orderItemsSchema = new mongoose.Schema({
    order_id:{
        type:mongoose.ObjectId,
        ref:'Order',
        required:true
    },
    product_id:{
        type:mongoose.ObjectId,
        required:true,
        ref:"Product"
    },
    quantity:{
        type:Number,
        require:true
    },
    unit_price:{
        type:Number,
        required:true
    },
    subtotal:{
        type:Number,
        required:true
    }
},{timestamps:true})

const orderItemsModel = mongoose.model("OrderItem",orderItemsSchema)

module.exports = orderItemsModel