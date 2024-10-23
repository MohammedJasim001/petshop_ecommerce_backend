import User from "../../Models/userModel.js"

export const viewAllUsers = async (req,res)=>{
    const users = await User.find()
    if(!users){
        return res.status(404).json({message:"No users"})
    }
    res.status(200).json(users)
}