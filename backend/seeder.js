const Products = require("./products")
const ProductModel = require("./model/productsModel")
const connection = require("./config/conn")
const insertData = async() => {

    try {
    //first delete all the data
    await ProductModel.deleteMany()
    //Now insert all products in Database
    const products = await ProductModel.insertMany(Products)
    console.log("Data Imported Successful") 
    } catch (error) {
        console.log("Error to Import Data ",error)
    }
}

const deleteData = async() =>{
    try {
        await ProductModel.deleteMany()
        console.log("Data Deleted Successful")
    } catch (error) {
        console.log("Error to Delete data ",error)
    }

}

if(process.argv[2] === "-d"){
    deleteData();
}
else{
    insertData();
}

