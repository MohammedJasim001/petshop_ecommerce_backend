
import User from "../../Models/userModel.js"

export const getOrders = async(req,res)=>{
    const userId = req.params.userId

    if (req.userId !== userId) {
        return res.status(403).json({ message: 'Access denied: unauthorized user.' });
    }

    const user = await User.findById(userId).populate({
        path:"orders",
        populate:{path:"products.productId"}
    })
    if(!user){
        return res.status(404).json({error:"User not found"})
    }
    if(!user.orders || user.orders.length == 0){
        console.log(user.orders)
        return res.status(404).json({message:"Your order list is empty"})
        
    }

    res.status(200).json(user.orders)
}