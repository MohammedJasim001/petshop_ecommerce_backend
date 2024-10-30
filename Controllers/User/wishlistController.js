import Products from "../../Models/productModel.js"
import User from "../../Models/userModel.js"
import Wishlist from "../../Models/wishlistModel.js"

//add to wishlist
export const addWishlist = async (req,res)=>{

    const {userId,productId} = req.params

    if (req.userId !== userId) {
        return res.status(403).json({ message: 'Access denied: unauthorized user.' });
    }

    const user = await User.findById(userId)
    if(!user){
        res.status(404).json({message:'User not found'})
    }
    
    const product =await Products.findById(productId)
    if(!product){
        return res.status(404).json({message:"Product not found"})
    }

    let wishlistItem =await Wishlist.findOne({userId:user._id,productId:product._id})
    if(wishlistItem){
        return res.status(404).json({message:'Product already exist in wishlist'})
    }

    wishlistItem = await Wishlist.create({
        productId:product._id,
        userId:user._id,
        quantity:1
    })
    user.wishlist.push(wishlistItem._id)
    await user.save()
    
    res.status(201).json({message:"Item added to wishlist"})
}

//view wishlist items
export const wishlistView = async(req,res)=>{
    
    const userId=req.params.userId


    if (req.userId !== userId) {
        return res.status(403).json({ message: 'Access denied: unauthorized user.' });
    }

    const user = await User.findById(userId).populate({
        path:'wishlist',
        populate:{path:'productId'}
    })

    if(!user.wishlist || user.wishlist.length===0){
        return res.status(404).json({message:'Your wishlist is empty',data:[]})
    }

    res.status(200).json(user.wishlist)
}

//delete wishlist items
export const deletWishlist = async(req,res)=>{

    const {userId,productId} = req.params

    if (req.userId !== userId) {
        return res.status(403).json({ message: 'Access denied: unauthorized user.' });
    }

    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({message:'User not found'})
    }

    const product = await Products.findById(productId)
    if(!product){
        return res.status(404).json({message:'Product not found'})
    }

    const wishlistItem = await Wishlist.findOneAndDelete({productId:product._id,userId:user._id})
    if(!wishlistItem){
        return res.status(404).json({message:"Not wishlist"})
    }

    const wishlistIndex = user.wishlist.findIndex(item=>item.equals(wishlistItem._id))
    if(wishlistIndex !== -1){
        user.wishlist.splice(wishlistIndex,1)
        await user.save()
    }

    res.status(200).json({message:'Item removed from the wishlist'})

}