const express = require('express')
const cartRouter = express.Router()
const {addToCart,removeFromCart,getCart} = require('../controllers/cartController')
const authMiddleware = require('../middlewares/auth')
cartRouter.use(authMiddleware);

cartRouter.post('/add',addToCart)
cartRouter.get('/get',getCart)
cartRouter.post('/remove',removeFromCart)

module.exports = cartRouter