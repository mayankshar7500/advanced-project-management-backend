import mongoose,  { Schema } from "mongoose";

const ProjectSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },

    description : {
        type : String,
        trim : true
    },

    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    members : [
        {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    ],

    status : {
        type : String,
        enum : ["active", "completed", "archieved"],
        default : "active"
    },

    priority : {
        type : String,
        enum : ["low", "medium", "high"],
        default : "medium"
    },

    deadline : {
        type : Date
    },

    isDeleted : {
        type : Boolean,
        default : false
    }
}, { timestamps : true })

export const Project = mongoose.model("Project", ProjectSchema);