import Orders from "../../Models/orderModel.js"

export const orderDetails = async (req,res)=>{
    const orders = await Orders.find()
 
    
    if(!orders || orders.length===0){
        res.status(404).json({message:"NO orders available"})
    }
    res.status(200).json(orders)
}

export const orderStats = async (req,res)=>{
    
    const stats = await Orders.aggregate([
        {
            $group: {
                _id: null,
                totalProducts: {
                    $sum: { $size: "$productId" }
                },
                totalRevenue: { $sum: "$totalPrice" }
            }
        }
    ]);
    

    if(stats.length==0){
        return res.status(200).json({stats:'success',totalProducts:0,totalRvenue:0})
    }
    
    res.status(200).json({stats:"succes",data:stats})
}