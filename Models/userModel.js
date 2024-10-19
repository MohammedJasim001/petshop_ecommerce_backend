import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
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
    isDeleted:{
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
    }]
    
})

const User = mongoose.model("Users",userSchema)

export default User