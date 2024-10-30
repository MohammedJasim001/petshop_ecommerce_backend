import User from "../../Models/userModel.js"

export const viewAllUsers = async (req,res)=>{
    const users = await User.find()
    console.log();
    if(!users){
        return res.status(404).json({message:"No users"})
    }
    res.status(200).json(users)
}

export const viewUserById = async (req,res)=>{
    const {userId} = req.params

    const user =await User.findById(userId)
    if(!user){
       return res.status(404).json({error:"User not found"})
    }
    res.status(200).json(user)
}

export const viewUserByName = async (req,res)=>{
    const {username} = req.params

    const user = await User.find({userName:{$regex:new RegExp(username,'i')}}).select('userName email')
    if(!user){
        return res.status(404).json({error:"User not found"})
    }
    res.status(200).json(user)
}

export const blockUser = async (req,res)=>{
    const {userId} = req.params

    const user = await User.findByIdAndUpdate(userId,{$set:{isBlocked:true}})
    if(!user){
        return res.status(404).json({error:"User not found"})
    }

    res.status(201).json({message:"User blocked successfully"})
}

export const unblockUser = async (req,res)=>{
    const {userId} = req.params

    const user = await User.findByIdAndUpdate(userId,{$set:{isBlocked:false}})
    if(!user){
        return res.status(404).json({error:"User not found"})
    }

    res.status(201).json({message:"User unblocked successfully"})
}