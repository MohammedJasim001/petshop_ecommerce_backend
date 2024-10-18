import express from 'express'
import { addToCart, cartVeiw, decrementQuantity, deleteCart, incrementQuantity } from '../Controllers/cartController.js'
import tryCatchMiddleware from '../Middlewares/tryCatchMiddleware.js'
import { userToken } from '../Middlewares/userMiddleware.js'

const router = express.Router()

router.use(userToken)

router.get('/:userId/cart',tryCatchMiddleware(cartVeiw))
router.post('/:userId/cart/:productId',tryCatchMiddleware(addToCart))
router.put('/:userId/cart/:productId/increment',tryCatchMiddleware(incrementQuantity))
router.put('/:userId/cart/:productId/decrement',tryCatchMiddleware(decrementQuantity))
router.delete('/:userId/cart/:productId/removecart',tryCatchMiddleware(deleteCart))

export default router