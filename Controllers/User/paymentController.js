import Razorpay from "razorpay"
import dotenv from "dotenv"
import crypto from 'crypto'
import User from "../../Models/userModel.js"
import Orders from "../../Models/orderModel.js"
import Cart from "../../Models/cartModel.js"

dotenv.config()

const razorpay = new Razorpay ({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

export const payment = async(req,res)=>{
    const id = req.params.id

    if (req.userId !== id) {
        return res.status(403).json({ message: 'Access denied: unauthorized user.' });
    }

    const user = await User.findById(id).populate({
        path:'cart',
        populate:{path:'productId'}
    })

    if(!user){
        return res.status(404).json({error:"User not found"})
    }

    if(!user.cart || user.cart.length===0){
        return res.status(200).json({message:"Your cart is empty"})
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
            products:productNames,
            userid:id
        }
    }
    console.log(option)

    const order = await razorpay.orders.create(option)
    res.status(201).json(order)
}

export const verifyPayment = async (req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body
    // HMAC (Hash-based Message Authentication Code)
    const hmac = crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET)
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id)
    const generatedSignature = hmac.digest('hex')

    if(generatedSignature !== razorpay_signature){
        console.log(generatedSignature)
        console.log(razorpay_signature)
       return res.status(404).json({error:'Verification failed'})
       
    }

    const order = await razorpay.orders.fetch(razorpay_order_id)

    const user = await User.findById(order.notes.userid).populate({
        path:'cart',
        populate:{path:'productId'}
    })

    const products = user.cart.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
    }));
    
    const newOrder = new Orders({
        userId: user.id,
        products: products, 
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        totalPrice: order.amount / 100,
        status: 'Paid',
    });
    

    await newOrder.save()
    user.orders.push(newOrder)
    user.cart = []
  
    await user.save()
    await Cart.deleteMany({userId:user._id})
    console.log(user)
    

    res.status(201).json({success:true,message:'Payment verified successfully'})
}