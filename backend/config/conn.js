const mongoose = require('mongoose');

const connection =  mongoose.connect("mongodb://localhost:27017/Jayant",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Connection Succesful"))
.catch((err)=>console.log("Connection Error "+err))


module.exports = connection