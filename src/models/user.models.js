import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },

    role: {
        type: String,
        enum: ["developer", "admin", "manager"],
        default: "developer"
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    refreshToken: String,

    forgotPassToken: String,
    forgotPassExpiry: Date,

    emailVerificationToken: String,
    emailVerificationExpiry: Date

}, { timestamps: true });


// Hash password
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password, 10);
    
});


// Compare password
UserSchema.methods.isPassCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};


// tokens
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.ACCESSKEY,
        { expiresIn: process.env.ACCESSEXPIRY }
    );
};

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.REFRESHKEY,
        { expiresIn: process.env.REFRESHEXPIRY }
    );
};


export const User = mongoose.model("User", UserSchema);