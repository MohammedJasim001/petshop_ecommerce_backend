import cloudinary from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_KEY,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

const storage = multer.diskStorage({})

const upload = multer({
    storage,
    limits:{fileSize:2000000000}
})

 export const uploadImage = (req,res,next)=>{

    upload.single('image')(req,res,async(err)=>{
        if(err){
            res.status(404).json({error:"File upload failed",err})
        }

        if(req.file){
            try {
                const stream = await cloudinary.v2.uploader.upload(req.file.path)
                req.cloudinaryImageUrl = stream.secure_url
                next()
            } catch (error) {
                return res.status(500).json({error:"Cloudinary upload failed",err}) 
            }
        }else{
            res.status(400).json({error:'No file uploaded'})
        }
       
    })
}
