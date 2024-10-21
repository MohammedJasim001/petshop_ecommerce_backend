import Razorpay from "razorpay"
import dotenv from "dotenv"
import crypto from 'crypto'
import User from "../Models/userModel.js"

dotenv.config()

const razorpay = new Razorpay ({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

export const payment = async(req,res)=>{
    const id = req.params.id
    const user = await User.findById(id).populate({
        path:'cart',
        populate:{path:'productId'}
    })

    if(!user){
        return res.status(404).json({error:"User not found"})
    }

    if(!user.cart || user.cart.length===0){
        res.status(200).json({message:"Your cart is empty"})
    }
    
    const amount = user.cart.reduce((total,item)=>{
        return total+=item.quantity*item.productId.price
       
    },0)
    console.log(amount)

    const productNames = user.cart.map(item=>item.productId.title).join(',')

    const option ={
        amount:amount*100,
        currency:'INR',
        receipt:`receipt_order_${Math.random().toString(36).substring(2,15)}`,
        notes:{
            product:productNames,
            userid:id
        }
    }
    console.log(option)

    const order = await razorpay.orders.create(option)
    res.status(201).json(order)
}
