import Cart from "../../Models/cartModel.js";
import Products from "../../Models/productModel.js";
import User from "../../Models/userModel.js";

//add to cart
export const addToCart = async (req,res)=>{

        const {userId,productId} = req.params
        

        if (req.userId !== userId) {
            return res.status(403).json({ message: 'Access denied: unauthorized user.' });
        }
  //find User
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        // if(user.isDeleted===true){
        //     res.status(200).json({message:'Admin blocked you'})
        // }
        
  //find Product
        const product = await Products.findById(productId)

        if(!product){
            return res.status(404).json({message:"product not found"})
        }

  //check item already in cart
        let cartItem = await Cart.findOne({userId:user._id,productId:product._id})
        if(cartItem){
            return res.status(409).json({message:'item already in the cart'})
            // cartItem.quantity++;
            // await cartItem.save()
            // return res.status(200).json({messege:'Cart product increment quantity'})
        }else{
            cartItem = await Cart.create({
                userId:user._id,
                productId:product._id,
                quantity:1
            })
            user.cart.push(cartItem._id)
            await user.save()
            return res.status(201).json({message:"Item successfully added to cart"})
        }
}


//view the cart
export const cartVeiw = async (req, res) => {
        const userId = req.params.userId

        if (req.userId !== userId) {
            return res.status(403).json({ message: 'Access denied: unauthorized user.' });
        }

        const user = await User.findById(userId).populate({
          path: "cart",
          populate: { path: "productId" },
        });
      
        if (!user) {
          return res.status(404).json({ message: "user not found" });
        }
      
        if (!user.cart || user.cart.length === 0) {
          return res.status(200).json({ message: "your cart is empty", data: [] });
        }
        res.status(200).json(user.cart);
};


//increment item quantity
export const incrementQuantity = async(req,res)=>{

        const userId = req.params.userId
        const productId = req.params.productId

        if (req.userId !== userId) {
            return res.status(403).json({ message: 'Access denied: unauthorized user.' });
        }
       
  //find user
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
       
  //find product
        const product = await Products.findById(productId)
        if(!product){
            return res.status(404).json({error:"Product not found"})
        }
       
  //find cart item
        const cartItem =await Cart.findOne({userId:user._id,productId:product._id})
        if(!cartItem){
            return res.status(404).json({error:"Cart item not found"})
        }
       
        cartItem.quantity++
        await cartItem.save()
        res.status(201).json({message:"Item count increased"})
}


//decrement item quantity
export const decrementQuantity = async(req,res)=>{

    const {userId,productId} = req.params

    if (req.userId !== userId) {
        return res.status(403).json({ message: 'Access denied: unauthorized user.' });
    }

  //find user
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({error:'User not found'})
        }
    
  //find product
        const product = await Products.findById(productId)
        if(!product){
            return res.status(404).json({error:'Product not found'})
        }
    
  //find cart item 
        const cartItem = await Cart.findOne({userId:user._id,productId:product._id})
        if(!cartItem){
            return res.status(404).json({error:'Cart not found'})
        }
            if(cartItem.quantity>1){
                cartItem.quantity--
                await cartItem.save()
                return res.status(201).json({message:'Item count decreased'})
            }
          


        
} 


//delete item from the cart
export const deleteCart = async(req,res)=>{

        const {productId,userId} = req.params

        if (req.userId !== userId) {
            return res.status(403).json({ message: 'Access denied: unauthorized user.' });
        }
  
  //find user
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({error:'User not found'})
        }

  //find product
        const product = await Products.findById(productId)
        if(!product){
            return res.status(404).json({error:'Product not found'})
            
            
        }

  //find cart item
        const cartItem = await Cart.findOneAndDelete({userId:user._id,productId:product._id})
        if(!cartItem){
           return res.status(404).json({error:'cartItem not found'})
        }

        // user.cart = user.cart.filter((ele)=>ele.id!==cartItem._id)
        // await user.save()
        // await cartItem.deleteOne({_id:cartItem._id})

        const cartItemIndex = user.cart.findIndex(item=>item.equals(cartItem._id) )
        if(cartItemIndex !== -1){
            user.cart.splice(cartItemIndex,1)
            await user.save()
            res.status(200).json({message:"Item removed from the cart"})
        }

   
}