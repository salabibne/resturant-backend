const xlsx = require('xlsx')
const fs = require('fs');
const path = require('path');
const {getToday} = require('../utils/utils')

const filePath = './report'
const fileName = 'report.xlsx'
const today = getToday()

const generateReportInExcel = function(data, startDate, endDate){

    

    if(!fs.existsSync(filePath)){
        console.log('Folder not found. Folder creating...')
        fs.mkdirSync(filePath,{recursive:true})
    }
    console.log("Folder found")
    let workbook = xlsx.utils.book_new();
    let rows = [['start=', startDate.toString(), 'end=', endDate.toString()],[],[],['Name', 'Unit Price', 'Total Quantity','Total Sell']]
    let sheet  = xlsx.utils.aoa_to_sheet(rows)
    
    xlsx.utils.book_append_sheet(workbook,sheet,today)
    
    const updatedData = [['start= '+startDate,'', 'end= '+endDate, ''],[],[],["Name","Unit Price","Total Quantity","Total Sell"]]
    
    for(let d of data){

        updatedData.push(d)
    }
    const updatedSheet = xlsx.utils.aoa_to_sheet(updatedData)
    workbook.Sheets[today] = updatedSheet
    
    
    
    xlsx.writeFile(workbook,path.join(filePath,fileName))
    

}

// if(fs.existsSync(filePath)){
        
//     console.log("file found")
//     workbook = xlsx.readFile(path.join(filePath, fileName))
// }else{
//     console.log("File not found")
//     fs.mkdir(filePath, {recursive:true}, (err)=>{
//         if(err){
//             console.error(`Error creating folder: ${err.message}`)
           
//         }
//     })
//     workbook = xlsx.utils.book_new()
// }

// let sheet = workbook.Sheets[today]

// if(!sheet){
//     console.log("Sheet not found")
//         sheet = xlsx.utils.aoa_to_sheet([["Name","Unit Price","Total Quantity","Total Sell"]]);
//         xlsx.utils.book_append_sheet(workbook,sheet,today)

//     }else{
//         console.log("Sheet found")
//     }

//     //const existingData = xlsx.utils.sheet_to_json(sheet,{header:1})
//     //console.log(existingData)

//     const updatedData = [["Name","Unit Price","Total Quantity","Total Sell"]]
    
//     for(let d of data){

//         // let row = [d.name,d.unit_price, d.totalQuantity,  data[name].total ]
//         updatedData.push(d)
//     }
//     const updatedSheet = xlsx.utils.aoa_to_sheet(updatedData)
//     workbook.Sheets[today] = updatedSheet

//     xlsx.writeFile(workbook,path.join(filePath,fileName))
// }
//  function checkDirectory (){
//     try{
//         fs.access(filePath, (err)=>{
//             if(err){
//                 fs.mkdir(filePath,(err)=>{
//                     if(err){
//                         console.log("Error creating directory ", err.message)
//                         return false
//                     }
//                 })
//             }
           
//             return true
//         })
//     }
//         catch(err){
//             console.log("Report Generation failed! "+err.message)
//         }
//     }
module.exports = {generateReportInExcel}