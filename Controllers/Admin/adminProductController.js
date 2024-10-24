import Products from "../../Models/productModel.js"

export const adminViewAllProducts = async (req,res)=>{
    const products = await Products.find()
    
    if(!products){
        return res.status(404).json({message:"No products"})
    }
    res.status(200).json(products)
}

export const adminViewProductByCategory = async (req,res)=>{
    const {productcategory} = req.params

    const product = await Products.find({
        $or:[
            {title:{$regex:new RegExp(productcategory,'i')}},
            {category:{$regex:new RegExp(productcategory,'i')}}
        ]
    }).select('title category price')

    if(!product){
        return res.status(404).json({message:"Product not found"})
    }

    res.status(200).json(product)
}

export const adminAddProduct = async (req,res)=>{
    
}