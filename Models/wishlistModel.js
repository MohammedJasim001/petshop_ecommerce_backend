import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
        
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
})

const Wishlist = mongoose.model('Wishlist',wishlistSchema)
export default Wishlist