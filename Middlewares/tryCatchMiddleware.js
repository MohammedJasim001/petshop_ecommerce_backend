

const tryCatchMiddleware = (handler)=>{
    return async(req,res,next)=>{
        
        try {
            handler(req,res,next)
        } catch (error) {
            console.error(error)
            res.status(500).json({
                status:"failur",
                message:"error",
                err_message:error.message
            })
        }
    }
}
export default tryCatchMiddleware