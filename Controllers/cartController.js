import Cart from "../Models/cartModel.js";
import Products from "../Models/productModel.js";
import User from "../Models/userModel.js";

//add to cart
export const addToCart = async (req,res)=>{
    try {
        const userId = req.params.userId
        const productId = req.params.productId
  //find User
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        if(user.isDeleted===true){
            res.status(200).json({message:'Admin blocked you'})
        }
        
  //find Product
        const product = await Products.findById(productId)

        if(!product){
            return res.status(404).json({error:"product not found"})
        }

  //check item already in cart
        let cartItem = await Cart.findOne({userId:user._id,productId:product._id})
        if(cartItem){
            return res.status(404).json({message:'item already in the cart'})
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


    } catch (error) {
        res.status(500).json({error:'server error of add to cart'})
        console.log(error)
    }
}


//view the cart
export const cartVeiw = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId).populate({
      path: "cart",
      populate: { path: "productId" },
    });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    if (!user.cart || user.cart.length === 0) {
      res.status(200).json({ message: "your cart is empty", data: [] });
    }
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({error:"server error from view cart"})
    console.log(error)
  }
};


//increment item quantity
export const incrementQuantity = async(req,res)=>{
   try {
        const userId = req.params.userId
        const productId = req.params.productId
       
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

   } catch (error) {
        res.status(500).json({error:"Server side error from increment count"})
        console.log(error)
   }

}


//decrement item quantity
export const decrementQuantity = async(req,res)=>{
    try {
        const {userId,productId} = req.params

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
        if(cartItem.quantity>0){
            cartItem.quantity--
            await cartItem.save()
            res.status(201).json({message:'Item count decreased'})
        }
        else{
            res.status(404).json({message:'cannot decrease count lessthan zero'})
        }
        

    } catch (error) {
        res.status(500).json({error:'server error from cart decreases'})
        console.log(error)
    }
} 


//delete item from the cart
export const deleteCart = async(req,res)=>{
    try {
        const {productId,userId} = req.params
  
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
            res.status(404).json({error:'cartItem not found'})
        }

        // user.cart = user.cart.filter((ele)=>ele.id!==cartItem._id)
        // await user.save()
        // await cartItem.deleteOne({_id:cartItem._id})

        const cartItemIndex = user.cart.findIndex(item=>item.equals(cartItem._id) )
        if(cartItemIndex !== -1){
            user.cart.splice(cartItemIndex,1)
            await user.save()
            res.status(200).json({message:"Item successfully removed from the cart"})
        }

        

    } catch (error) {
        res.status(500).json({error:'server error from deletCart'})
        console.log(error)
    }
    
}