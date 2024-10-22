import express from 'express'
import tryCatchMiddleware from '../Middlewares/tryCatchMiddleware.js'
import { addWishlist, deletWishlist, wishlistView } from '../Controllers/wishlistController.js'
import { userToken } from '../Middlewares/userMiddleware.js'

const router = express.Router()

router.use(userToken)

router.get('/:userId/wishlist',tryCatchMiddleware(wishlistView))
router.post('/:userId/wishlist/:productId',tryCatchMiddleware(addWishlist))
router.delete('/:userId/wishlist/:productId/removewishlist',tryCatchMiddleware(deletWishlist))


export default router