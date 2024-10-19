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
    
})

const User = mongoose.model("Users",userSchema)

export default User