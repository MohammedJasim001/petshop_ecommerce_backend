import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './Routes/userRoutes.js'
import adminRoutes from './Routes/adminRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser"


dotenv.config()

const port = process.env.PORT || 4000
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)

mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log('mongodb connected'))
        .catch((err)=>console.log(err))

app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})