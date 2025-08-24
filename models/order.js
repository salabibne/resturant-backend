const mongoose = require('mongoose')
const {getToday} = require('../utils/utils')
const {PAYMENT_METHOD, ORDER_STATUS} = require('../constant/constant')

const orderSchema = new mongoose.Schema({
    order_date:{
        type:Date,
        default: new Date().toISOString()
    },
    total_amount:{
        type:Number,
        required:true
    },
    payment_method:{
        type:String,
        enum:{
            values:Object.values(PAYMENT_METHOD),
            message:'{VALUE} is not valid payment method'
        },
        default:PAYMENT_METHOD.CASH
    },
    status:{
        type:String,
        enum:{
            values:Object.values(ORDER_STATUS),
            message:'{VALUE} is not valid'
        },
        default: ORDER_STATUS.COMPLETED
    }

},{timestamps:true})

const orderModel = mongoose.model("Order",orderSchema)
module.exports = orderModel