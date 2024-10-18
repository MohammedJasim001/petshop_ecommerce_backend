import express from 'express'
import { viewProduct, viewProductByCategory, viewProductById } from '../Controllers/productController.js'
import { userToken } from '../Middlewares/userMiddleware.js'
import tryCatchMiddleware from '../Middlewares/tryCatchMiddleware.js'

const router = express.Router()

router.use(userToken)

router.get('/products',tryCatchMiddleware(viewProduct))
router.get('/products/:id',tryCatchMiddleware(viewProductById))
router.get('/products/category/:categoryName',tryCatchMiddleware(viewProductByCategory))

export default router