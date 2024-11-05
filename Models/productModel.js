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
    image:{
        type:String,
     
    },
    category:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
    },
    brand:{
        type:String
    },
    rating:{
        type:Number
    },
    productCategory:{
        type:String
    },
    

},
{timestamps:true}
)

const Products = mongoose.model('Products',productSchema)
export default Products