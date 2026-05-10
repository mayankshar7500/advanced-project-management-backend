import { User } from "../models/user.models.js";
import ApiError from "../utils/Api-error.js";

export const registerUser = async function (data) {
    const { username, email, password } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    const user = await User.create({
        username,
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password");

    return createdUser;
};


export const loginUser = async function(data){
    const { email, password} = data

    const user = await User.findOne({ email }).select("+password")

    if(!user){
        throw new ApiError(404, "user does not exist")
    }

    const isMatch = await user.isPassCorrect(password)

    if(!isMatch){
        throw new ApiError(401, "Invalid Credentials")
    }


    const refreshToken = user.generateRefreshToken()

    const accessToken = user.generateAccessToken()

    user.refreshToken = refreshToken
    await user.save()

    const loggedInUser = await User.findById(user._id).select("-password")


    return {
        user : loggedInUser,
        accessToken,
        refreshToken
    }
}