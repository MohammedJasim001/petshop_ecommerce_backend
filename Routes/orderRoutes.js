import express from "express"
import tryCatchMiddleware from "../Middlewares/tryCatchMiddleware.js"
import { payment, verifyPayment } from "../Controllers/paymentController.js"

const router = express.Router()

router.post('/payment/:id',tryCatchMiddleware(payment))
router.post('/verifypayment/',tryCatchMiddleware(verifyPayment))

export default router