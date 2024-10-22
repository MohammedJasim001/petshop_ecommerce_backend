import express from 'express'
import { login, register } from '../Controllers/authController.js'
import { uploadImage } from '../Middlewares/imageUploadMiddleware.js'
import { viewProduct, viewProductByCategory, viewProductById } from '../Controllers/productController.js'
import { addToCart, cartVeiw, decrementQuantity, deleteCart, incrementQuantity } from '../Controllers/cartController.js'
import { addWishlist, deletWishlist, wishlistView } from '../Controllers/wishlistController.js'
import { payment, verifyPayment } from '../Controllers/paymentController.js'
import { getOrders } from '../Controllers/orderController.js'
import tryCatchMiddleware from '../Middlewares/tryCatchMiddleware.js'
import { userToken } from '../Middlewares/authMiddleware.js'

const router = express.Router()

//userAuth
router.post('/register',uploadImage,register)
router.post('/login',login)

//products
router.get('/products',tryCatchMiddleware(viewProduct))
router.get('/products/:id',tryCatchMiddleware(viewProductById))
router.get('/products/category/:categoryName',tryCatchMiddleware(viewProductByCategory))

router.use(userToken)
//cart
router.get('/:userId/cart',tryCatchMiddleware(cartVeiw))
router.post('/:userId/cart/:productId',tryCatchMiddleware(addToCart))
router.put('/:userId/cart/:productId/increment',tryCatchMiddleware(incrementQuantity))
router.put('/:userId/cart/:productId/decrement',tryCatchMiddleware(decrementQuantity))
router.delete('/:userId/cart/:productId/removecart',tryCatchMiddleware(deleteCart))

//wishlist
router.get('/:userId/wishlist',tryCatchMiddleware(wishlistView))
router.post('/:userId/wishlist/:productId',tryCatchMiddleware(addWishlist))
router.delete('/:userId/wishlist/:productId/removewishlist',tryCatchMiddleware(deletWishlist))

//payment
router.post('/payment/:id',tryCatchMiddleware(payment))
router.post('/verifypayment/',tryCatchMiddleware(verifyPayment))

//order
router.get("/:userId/orders",tryCatchMiddleware(getOrders))

export default router