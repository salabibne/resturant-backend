const Product = require("../models/product")

//GET api/query/:q
//desc Get results match with name and q string
const queryResult = (req,res)=>{
    let q = req.params.q || ''
    let regex = new RegExp(q,"i")

    Product.find({name:regex})
    .then(data=>{
        res.json({status:"success",count:data.length,data})
    })
    .catch(err=>{
        res.status(500)
        res.json({status:"failed",message:err.message})
    })
    
}



module.exports = { queryResult }
