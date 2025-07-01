const express = require('express')
const app=express()
const connectDB = require('./config/dbConn')

const port = process.env.PORT || 5000

//middlewares
app.use(express.json())
const cors=require('cors')
app.use(cors())
require('dotenv').config()
connectDB()
app.use("/image",express.static('uploads'))

//api endpoints
app.use('/api/food',require('./routes/foodRouter'))
app.use('/api/user',require('./routes/userRouter'))
app.use('/api/cart',require('./routes/cartRouter'))
app.use('/api/order',require('./routes/orderRouter'))


app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})
