import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './Routes/userRoutes.js'
import cors from 'cors'


dotenv.config()

const port = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users',userRoute)


mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log('mongodb connected'))
        .catch((err)=>console.log(err))

app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})