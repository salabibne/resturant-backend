

const Product = require('../models/product')
const {CATEGORIES} = require('../constant/constant')

//GET api/products
//desc Get all product items

const getAllProducts = (req,res)=>{
    Product.find({})
    .then(products=>{
        res.json({status:"success",count:products.length,data:products})
    })
    .catch(err=>{
        res.status(500)
        res.json({status:"failed",message:err.message})
    })
    
}

//GET api/products/{productName}
//desc Get a product with id {id}
const getSingleProduct = (req,res)=>{
    const productName = decodeURIComponent(req.params.productName || "");
    console.log(productName);

    // if(!id){
    //     res.status(400)
    //     res.json({status:'failed', message:'Provided id is not valid!'})
    //     return;
    // }

    // Product.find({name:productName})
    Product.find({ name: productName })
      .then((product) => {
        console.log("product array", product);
        if (product) res.json({ status: "success p", data: product });
        else res.json({ status: "product ", data: {} });
      })
      .catch((err) => {
        res.json({ status: "failed", message: err.message });
      });
    
}

//GET api/products/category/:category
//desc Get category wise product

const getProductByCategory = (req,res)=>{
    let category = req.params.category
    
    name.toLowerCase
    if(!category){
        res.status(400)
        res.json({status:'failed', message:'Category is not provided'})
        return;
    }else if(! Object.values(CATEGORIES).includes(category.toLowerCase())){
        res.status(400)
        res.json({status:'failed', message:`${category} is not valid. Valid categories are ${Object.values(CATEGORIES)}`})
    }
    Product.find({category})
    .then(result=>{
        res.json({status:'success',data:result})
    })
    .catch(err=>{
        res.status(400)
        res.json({status:'failed', message:err.message})
    })
   
}

//POST api/products
//desc Add a product item

const addProduct = (req,res)=>{
    const {name,price,category} = req.body

    if ( !(name && price && category) ){
        res.status(400)
        res.json({status:'failed',message:'name, price, category value must be provided!'})
        return
    }
    if (! Object.values(CATEGORIES).includes(category.toLowerCase())){
        res.status(400)
        res.json({status:'failed', message:`${category} is not valid. Valid categories are: ${Object.values(CATEGORIES)}`})
        return
    }

    Product.create({name,price,category})
    .then(product=>{
        res.json({status:'success',data:product})
    })
    .catch(err=>{
        res.status(400)
        res.json({status:"failed",message:err.message})
    })
    
}

//PUT api/products/{id}
//desc update a product with id {id}

const updateProduct = (req,res)=>{
    const id = req.params.id
    const {price} = req.body
    if(!id){
        res.status(400)
        res.json({status:'failed', message:'id must be provided'})
        return
    }
   
    if (price){
        Product.findByIdAndUpdate(id,{price}, {new:true})
        .then(data=>{
            res.json({status:'success',message:"Price updated successfully",data})
        })
        .catch(err=>{
            res.status(400)
            res.json({status:'success', message:err.message})
        })
    }else{
        res.status(404)
        res.json({status:'success',message:err.message})
    }

}

// const updateProduct = (req, res) => {
//     const id = req.params.id; // Corrected param name
//     console.log(id);
//   const { name, price, category } = req.body;

//   if (!id) {
//     return res.status(400).json({
//       status: "failed",
//       message: "Product ID must be provided",
//     });
//   }

//   // Build the update object dynamically
//   const updateFields = {};
//   if (name) updateFields.name = name;
//   if (price) updateFields.price = price;
//   if (category) updateFields.category = category;

//   if (Object.keys(updateFields).length === 0) {
//     return res.status(400).json({
//       status: "failed",
//       message: "No fields provided to update",
//     });
//   }

//   // Perform the update
//   Product.findByIdAndUpdate({_id: id}, updateFields, { new: true }) // `new: true` returns the updated document
//     .then((data) => {
//       if (!data) {
//         return res.status(404).json({
//           status: "failed",
//           message: "Product not found on Database",
//         });
//       }
//       res.json({
//         status: "success",
//         message: "Product updated successfully",
//         data,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         status: "failed",
//         message: err.message,
//       });
//     });
// };



//DELETE api/products/{id}
//desc Delete a product

const deleteProduct = (req,res)=>{
    const id = req.params.id
    if(!id){
        res.status(400)
        res.json({status:'failed', message:'id must be provided'})
        return
    }
    
    Product.deleteOne({_id:id})
    .then(data=>{
        res.json({status:"success", message:"Deleted successfully",data})
    })
    .catch(err=>{
        res.status(500)
        res.json({status:"failed",message:err.message})
    })
    
}




module.exports = {getAllProducts,getSingleProduct, addProduct, updateProduct,deleteProduct,getProductByCategory}