import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products',
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
})

const Cart = mongoose.model('Cart',cartSchema)
export default Cart