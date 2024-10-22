import Products from "../Models/productModel.js"

//viewProduct
export const viewProduct = async(req,res)=>{
    
        const produts = await Products.find()
        if(!Products){
            return res.status(404).json({message:'Unable to get products'})
        }
        res.status(200).json({produts})
}

//viewProductByID
export const viewProductById = async (req,res)=>{
    
        const product = await Products.findById(req.params.id)
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        res.status(200).send({product})
}

//viewProductByCategory
export const viewProductByCategory = async(req,res)=>{
        
        const {categoryName} = req.params
        const product = await Products.find({
            $or:[
                {category:{$regex:new RegExp(categoryName,'i')}},
                {title:{$regex:new RegExp(categoryName,'i')}}
            ]
        }).select('title category price')
        
        if (!product || product.length===0) {
            return res.status(404).json({ message: 'Unable to get products' });
        }
        
        
        res.status(200).json({product})
        
}