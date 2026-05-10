import { registerUser, loginUser } from "../services/auth.services.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const register = asyncHandler(async (req, res) => {
    const user = await registerUser(req.body);

    res.status(201).json({
        success: true,
        user
    });
});


export const login = asyncHandler( async (req, res)=>{
    const result = await loginUser(req.body);

    res.status(200).json({
        success : true,
        ...result
    })
})