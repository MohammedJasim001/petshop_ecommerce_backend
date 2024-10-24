import Products from "../../Models/productModel.js"
import productJoi from "../../Validation/productJoi.js"
import express from 'express'

const app = express()
app.use(express.json())

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

export const adminAddProduct =async(req,res)=>{
    const product = await productJoi.validateAsync(req.body)

    if(!product){
        return res.status(400).json({error:"Validation error"})
    }
    const newProduct = new Products({
        title:product.title,
        description:product.description,
        price:product.price,
        category:product.category,
        image:req.cloudinaryImageUrl,
        quantity:product.quantity
    })
    await newProduct.save()
    res.status(201).json({message:"New product added",newProduct})
}

export const adminUpdateProduct = async(req,res)=>{
    const {productId} = req.params

    const updated = await Products.findByIdAndUpdate(productId)
    if(!updated){
        return res.status(404).json({error:"No products found"})
    }
    const {title,description,category,price,quantity} = req.body

    if(title) updated.title=title
    if(description) updated.description=description
    if(category) updated.category=category
    if(price) updated.price=price
    if(quantity) updated.quantity=quantity
    if(req.cloudinaryImageUrl) updated.image=req.cloudinaryImageUrl

    await updated.save()
    res.status(201).json({message:"Product successfully updated",updated})
} 
 
export const adminDeleteProduct = async (req,res)=>{
    const {productId} = req.params

    const deleted = await Products.findByIdAndDelete(productId)
    if(!deleted){
        return res.status(404).json({error:"No products found"})
    }

    res.status(200).json({message:"Product successfully deleted"})
}