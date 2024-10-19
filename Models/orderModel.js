import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    product:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Products',
            required:true
        },

    }],
    purchaseData:{
        type:Date,
        required:true,
        default:Date.now
    },
    orderTime:{
        type:String,
        required:true,
        default:new Date().toTimeString()
    },
    orderId:{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    paymentId:{
        type:String,
        required:true
    }
})

const Orders = mongoose.model('Oreders',orderSchema)
export default Orders