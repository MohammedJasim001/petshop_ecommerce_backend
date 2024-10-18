import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './Routes/userRoutes.js'
import productRoute from './Routes/productRoutes.js'
import cartRoute from './Routes/cartRoutes.js'

const port = 5000
const app = express()
dotenv.config()

app.use(express.json())

app.use('/api/users',userRoute)
app.use('/api/users',productRoute)
app.use('/api/users',cartRoute)

mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log('mongodb connected'))
        .catch((err)=>console.log(err))

app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})