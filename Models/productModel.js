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
        type:Number,
        required:true
    },
    Image:{
        type:String,

    },
    category:{
        type:String,
        required:true
    },
    // quantity:{
    //     type:Number,
    //     default:1
    // },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)

const Products = mongoose.model('Products',productSchema)
export default Products