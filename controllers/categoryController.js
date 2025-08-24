const {CATEGORIES} = require('../constant/constant')

const addCategory = (req,res)=>{
    res.send("Category addition is not available!")
}

const getCategories = (req,res)=>{
    res.json({status:'success', data:Object.values(CATEGORIES)})
}

module.exports = {addCategory, getCategories}