import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accountCreateDate:{
        type:Date,
        default:Date.now(),
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    }],
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Wishlist'
    }],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Orders'
    }],  
},
{timestamps:true}
)

const User = mongoose.model("Users",userSchema)

export default User