import express from "express"
import tryCatchMiddleware from "../Middlewares/tryCatchMiddleware.js"
import { payment } from "../Controllers/paymentController.js"

const router = express.Router()

router.post('/payment/:id',tryCatchMiddleware(payment))

export default router