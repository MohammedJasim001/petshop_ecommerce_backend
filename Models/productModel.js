import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true
    },
    Image:{
        type:String,

    },
    category:{
        type:String,
        required:true
    },
    quantity:{
        type:String

    },
    isDeleted:{
        type:Boolean,
        default:false
    }

})

const Products = mongoose.model('Products',productSchema)
export default Products