const fs = require('fs')
const path = require('path')
const OrderItem = require('../models/orderItem')
const Order = require('../models/order')
const {getToday} = require('../utils/utils')
const {generateReportInExcel}  = require('../services/reportService')

//GET api/report/order
//desc get total order and total amount and max ordered item
const getOrderReport = async (req,res)=>{
    try{
        const data = await Order.aggregate([ {
            $group:{
                _id:null,
                totalOrder:{$sum:1},
                totalAmount:{$sum:'$total_amount'}
            }
        }])
      
        const maxOrderedItem = await OrderItem.aggregate([
            {
                $group:{
                    _id:'$product_id',
                    totalAmount:{$sum:'$subtotal'},
                    totalOrder:{$sum:1},
                    totalQuantity:{$sum:'$quantity'}
                }
            },
            {
                $sort:{totalAmount:-1}
            },
            {
                $limit:1
            },
            {
                $lookup:{
                    from :'products',
                    localField:'product_id',
                    foreignField:'_id',
                    as:'productInfo'
                }
            },
            {
                $unwind: '$productInfo',
                
                //preserveNullAndEmptyArrays:true
            }
        ])
        
    //    const data =  await OrderItem.aggregate([
    //       {
    //         $lookup:{
    //             from:'products',
    //             localField:'product_id',
    //             foreignField:'_id',
    //             as:'productDetails'
    //         }
    //        },
    //        {
    //         $unwind:'$productDetails'
    //        },
    //        {
    //         $group:{
    //             _id:'$productDetails.name',

    //         }
    //        }
        //     ])
        const report = {
            totalAmount: data[0].totalAmount,
            totalOrder: data[0].totalOrder,
        }

        res.json({status:'success', data:{report,maxOrderedItem}})
       
    }catch(err){
        res.status(400)
        res.json({status:'failed',message:err.message})
    }
    

}

//GET api/report/excel?start=date1&end=date2
//desc Generate report in excel file


const generateReport = async (req,res)=>{

    let startDate = new Date(new Date(req.query.start).setHours(6) || new Date());
    let endDate = new Date(new Date(req.query.end).setHours(23) || Date.now());


    try{

        const data = await OrderItem.aggregate([
        {
            $lookup:{
                from:'orders',
                localField:'order_id',
                foreignField:'_id',
                as:'orderDetails'
            }
        },

        {
            $unwind:'$orderDetails'
        },
        {
            $match:{
                'orderDetails.order_date':{
                    $gte:startDate,
                    $lte:endDate
                }
            }
        },
        {
            $lookup:{
                from:'products',
                localField:'product_id',
                foreignField:'_id',
                as:'productDetails'
            }
        },
        {
            $unwind:'$productDetails'
        },
        {
            $group:{
                _id:'$productDetails.name',
                date:{$first:'$orderDetails.order_date'},
                productName:{$first:'$productDetails.name'},
                unitPrice:{$first:'$productDetails.price'},
                totalQuantity: { $sum: "$quantity" },
                totalRevenue: { $sum: '$subtotal' }
            }
        }
        ])
    
        console.log("data",data)
    
        let result = []
        data.forEach((v)=>{
            let item = [v.productName, v.unitPrice, v.totalQuantity, v.totalRevenue]
            result.push(item)
        })
        //res.json({status:'success',data, startDate, endDate})
        generateReportInExcel(result, startDate, endDate)

        res.attachment(`${getToday()}.xlsx`)
        const readStream = fs.createReadStream(path.join('./report', 'report.xlsx'))
        readStream.pipe(res)
       
    }
    catch(err){
        res.status(400)
        res.json({status:'failed',message:err.message})
    }
    
   

    
    // OrderItems.find({'order_id.order_date':{
    //     $gte:startOfToday,
    //     $lt:endOfToday
    // }}).populate('product_id','order_id')

    // .then(items=>{
    //     console.log(items)
    //     items.forEach((item)=>{
    //        let key = item.product_id.name
    //        if(key in result){
    //         result[key].total += item.subtotal
    //         result[key].totalQuantity += item.quantity
    //        }else{
    //         result[key] = {total:item.subtotal, totalQuantity:item.quantity, unit_price:item.unit_price}
    //        }

           
            
            // if(map.has(key)){
            //     map[key].total += v.subtotal
            //     map[key].totalQuantity += v.quantity
            // }else{
            //     map[key] = {total:v.subtotal, totalQuantity:v.quantity, unit_price:v.unit_price}
            // }
            // console.log(map)
        // })
        
       //generateExcel(result);
       
       
    // })

    // .catch(err=>{
    //     console.log(err)
    //     res.json({status:"failed2",message:err.message})
    // })

   
    
}

module.exports = {generateReport, getOrderReport}