
const Product = require('../models/product')
const Order = require('../models/order')
const OrderItem = require('../models/orderItem')

//POST api/orders
//desc Add a Order
//order{amount:int, items:productItem[id:int,quantity:int,unit_price:int]}

// {
//     "amount": 225,
//     "items": [
//         [
//             "67545dffaa8b2bcdb0612883",
//             1,
//             25
//         ],
//         [
//             "67545ef0aa8b2bcdb0612886",
//             10,
//             20
//         ]
//     ]
// }
const addOrder = async (req,res)=>{
    const order = req.body
    console.log("order",order)
    
    const orderedItems = order.items || []
    console.log("orderItems",orderedItems)

    if((!order) || (orderedItems.length <= 0)){
        res.status(400)
        res.json({status:"failed",message:"Order should not be empty"})
        return ;
    }
    try{
        let savedOrder = await Order.create({total_amount:order.amount})
        let items = []
        for(let item of orderedItems){
            //let product = await Product.findById(item.id)
            let i = await OrderItem.create(
                {
                    order_id:savedOrder._id,
                    product_id:item[0],
                    quantity:item[1],
                    unit_price:item[2],
                    subtotal:item[1] * item[2]
                })
                items.push(i)
        }
        res.json({status:"success", message:"Data inserted successfully.", data:{savedOrder, items}})
        
    }catch(err){
        res.json({status:"failed",message:err.message})
    }
}
//GET api/orders
//desc Get all orders

const getAllOrders = (req,res)=>{
    Order.find({})
    .then(data=>{
        res.json({status:"success", data})
    })
    .catch(err=>{
        res.json({status:"failed",message:err.message})
    })
}
//GET api/orders/:id/items
//desc Get all items of a order
const getOrderItems = (req,res)=>{
    const orderId = req.params.id

    OrderItem.find({order_id:orderId}).populate('product_id')
    .then(data=>{
        res.json({status:'success', data})
    })
    .catch(err=>{
        res.status(400)
        res.json({status:'failed', message:err.message})
    })
}
//GET api/orders/report
//desc Get orders report
const getTotalSale = (req,res)=>{
   Order.aggregate([
    {
        $group:{$sum:'$total_amount'}
    }
   ])
   .then(data=>{
    res.json({status:'success', data})
   })
   .catch(err=>{
    res.status(400)
    res.json({status:'failed', message:err.message})
   })
}



module.exports = {addOrder,getAllOrders, getTotalSale, getOrderItems}

// for(let item of items){
//     let order = null
//     //Check if the product is already added to the order list or not
//     //if the product is added ,increase the quantity only.Otherwise add the product.
//     if(order =  await isOrderExist(item.productId)){
//         if(item.quantity || (item.quantity<=0)){
//             res.status(500)
//             res.json({status:"failed",message:"Quantity must be a positive number greater than 0"})
//             return;
//         }
//         order.quantity+=item.quantity;
//         await order.save()
//     }else{
//         let product = await Product.findById(item.productId)
//         await Order.create({date:Date.now(), product:product._id,quantity:item.quantity})
//     }
// }
// res.json({status:"success",message:"Order added successfully"})


// const isOrderExist = async (productId)=>{
//         try{
//             let order = await Order.findOne({product:productId})
//             return order;
//         }catch(err){
//             console.log(err.message)
//             return null
//         }
// }