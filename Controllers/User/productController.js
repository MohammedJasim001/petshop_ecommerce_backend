import Products from "../../Models/productModel.js"


//viewProduct
export const viewProduct = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) 

        const skip = (page - 1) * limit;

        const products = await Products.find().skip(skip).limit(limit);

        const totalProducts = await Products.countDocuments();

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json({
            products,
            pagination: {
                totalProducts,
                currentPage: page,
                totalPages: Math.ceil(totalProducts / limit),
                hasNextPage: page * limit < totalProducts,
                hasPreviousPage: page > 1,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching products', error });
    }
};


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
                
            ]
        })
        
        if (!product || product.length===0) {
            return res.status(404).json({ message: 'Unable to get products' });
        }
        
        
        res.status(200).json({product})
        
}