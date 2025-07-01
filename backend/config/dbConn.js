const mongoose = require('mongoose')
const connectDB=async()=>{
    await mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Connected to DB")
    })
}

module.exports = connectDB