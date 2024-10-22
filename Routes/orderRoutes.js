import express from "express"
import tryCatchMiddleware from "../Middlewares/tryCatchMiddleware.js"
import { payment, verifyPayment } from "../Controllers/paymentController.js"
import { userToken } from "../Middlewares/userMiddleware.js"
import { getOrders } from "../Controllers/orderController.js"

const router = express.Router()

router.use(userToken)

router.post('/payment/:id',tryCatchMiddleware(payment))
router.post('/verifypayment/',tryCatchMiddleware(verifyPayment))

router.get("/:userId/orders",tryCatchMiddleware(getOrders))

export default router