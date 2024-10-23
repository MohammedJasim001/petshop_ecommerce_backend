import env from 'dotenv'
import jwt from 'jsonwebtoken'

env.config()

export const adminLogin = async(req,res)=>{
    const {email,password} = req.body

    if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
        const token = jwt.sign({email,password},process.env.JWT_SECRETE_KEY)
        res.cookie('access-token', token, {httpOnly:true})

        res.status(201).json({message:"Admin login successfull",token})
    }
    else{
        res.status(404).json({error:"Something went wrong, check your details again"})
    }
}