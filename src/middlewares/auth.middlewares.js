import jwt from "jsonwebtoken";
import ApiError from "../utils/Api-error.js";
import { token } from "morgan";
import { User } from "../models/user.models.js";

export const verifyJwt = async (req, res, next)=>{
    try{
        const token = req.headers.authorization?.replace("Bearer ", "");

        if(!token){
            throw new ApiError(401, "Unauthorized : no token provided")
        }

        const decoded = jwt.verify(token, process.env.ACCESSKEY)

        const user = await User.findById(decoded.id).select("-password -refreshToken")

        if(!user) throw new ApiError(401, "Unauthorized : invalid token")

        req.user = user
        next()
    }

    catch( error ){
        throw new ApiError(401, "Unauthorized");
    }

    
}