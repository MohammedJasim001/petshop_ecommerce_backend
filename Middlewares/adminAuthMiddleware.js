import jwt from 'jsonwebtoken'
import env from 'dotenv'

env.config

export const adminToken = async (req,res,next)=>{

    try {
        const header = req.headers['authorization']
        const token = header && header.split(' ')[1]

        if(!token){
            return res.status(404).json({error:"Token not provided"})
        }

        jwt.verify(token,process.env.JWT_SECRETE_KEY,(err,admin)=>{
            if(err){
               return res.status(404).json({error:"Unauthorized check your token again"})
            }
            if(admin.role!=='admin'){
                return res.status(404).json({message:"You are not an admin"})
            }
            req.email=admin.email
            next()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Server error on admin auth"})
    }
}