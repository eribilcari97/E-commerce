import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const protectRoute = async (req,res,next)=>{
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({message:"Unauthorized-No access token provided"})
        }
        //-------------
       try {
          const decoded =jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(401).json({message:"user not found"});
            
        }
        req.user = user;
        next();//once this func is completed call the next in the product.routes
       } catch (error) {
        if(error.name==="TokenExpiredError"){
            return res.status(401).json({message:"Unauthoized -Acces token expired"});

        }
        throw error;
       }
    } catch (error) {
       console.log("Error in prtectRoute middleware",error.message);
       return res.status(401).json({message:"Unauthorized"});

    }
}


export const adminRoute =  (req,res,next)=>{
    if(req.user &&req.user.role==="admin"){
        next();//call the next func , getAllProducts
    }else{
        res.status(403).json({message:"Access denied -Admin only"})

    }
}