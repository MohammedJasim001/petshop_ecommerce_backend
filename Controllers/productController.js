import Products from "../Models/productModel.js"


export const viewProduct = async(req,res)=>{
    try {
        const produts = await Products.find()
        if(!Products){
            return res.status(404).json({message:'Unable to get products'})
        }
        res.status(200).json({produts})
    } catch (error) {
        res.status(500).json({error:"error from the server side"})
        console.log(error)
    }
}

export const viewProductById = async (req,res)=>{
    try {
        const product = await Products.findById(req.params.id)
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        res.status(200).send({product})
    } catch (error) {
        res.status(500).json({message:'error from the server side'})
        console.log(error)
    }
}

export const viewProductByCategory = async(req,res)=>{
    try {
        
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
        
    } catch (error) {
        res.status(500).json({error:'error from server side'})
        console.log(error)
    }

}