import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const userToken = async(req,res,next)=>{
    try {
        const header = req.headers['authorization']
        const token = header && header.split(' ')[1]

        if(!token){
            return res.status(404).json({message:'token not provided'})
        }

        jwt.verify(token,process.env.JWT_SECRETE_KEY,(err,user)=>{
            if(err){
                console.log(err)
               return res.status(404).json({message:'unauthorized check your token again'})
            }
            req.email=user.email

            next()
        })

    } catch (error) {
        res.status(500).json({error:error})
    }
}