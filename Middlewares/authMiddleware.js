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

        jwt.verify(token,process.env.JWT_SECRETE_KEY,(err,decoded)=>{
            if(err){
                console.log(err)
               return res.status(404).json({message:'unauthorized check your token again'})
            }
            const { id } = decoded;
            if (!id) {
                return res.status(403).json({ message: 'Token is missing user identification.' });
            }
            
            req.userId = id; 
            next();
        })

    } catch (error) {
        res.status(500).json({error:error})
    }
}