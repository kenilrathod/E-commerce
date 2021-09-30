const express = require('express');
const port = process.env.PORT | 8000;
const productsModel = require("./model/productsModel")
const User = require("./model/usersModel")
const bcrypt = require("bcrypt")
const connection = require("./config/conn")
const cors = require("cors")
const bp = require("body-parser")
const app = express()

const stripe = require("stripe")("sk_test_51JRWqUSCWXkZTuKiZuZYkLQ13mDPqrpE3xz2Rb6uBrcMKqJzJ4ulBWSYNSwqXZzt4MEc3BYFIdWpJglKA4VdJkts00Onwy2t7n");
app.use(express.json())
app.use(bp.json())
app.use(bp.urlencoded({extended:true}))
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Hello from server")
})
app.get("/product",async(req,res)=>{
    const products = await productsModel.find({})
    res.json(products)
})
app.get("/product/:id",async(req,res)=>{
    const singleProduct = await productsModel.findById(req.params.id)
    console.log(singleProduct)
    res.json(singleProduct)
})
app.get("/userregister",(req,res)=>{
    console.log("data request")
})

app.post("/userregister",async(req,res)=>{
    const email = req.body.email
    const cpassword = req.body.cpassword
    const userpassword = req.body.password
    if(cpassword === userpassword){
    const password = await bcrypt.hash(userpassword,10)
    const result = await User.create({
        email,
        password
    })
    res.json(email)}
    
})

app.post("/login",async(req,res)=>{
    const email = req.body.email

    const result = await User.findOne({email})
    console.log(result.password)
    const ispasswordmatch = await bcrypt.compare(req.body.password,result.password)
    
    if(ispasswordmatch){
        res.json({message:"We are logging you in"})
    }
    else{
        res.json({message:"Invalid email or Password"})
    }
})

app.post("/payment",cors(),async(req,res)=>{
    let {amount,id} = req.body
    console.log(amount+" "+id)
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:"INR",
            description:`payment of ${amount} for Jayant store`,
            payment_method:id,
            confirm:true,
        })
        console.log("Payment",payment)
        res.json({
            message:"Payment Succesfull",
            success:true
        })
    } catch (error) {
        console.log(error+" Payment Failed")
        res.json({
            message:"Payment Failed",
            success:false
        })
    }
})

//------------------------------------

app.listen(port,()=>console.log(`Server is running on ${port} port`))