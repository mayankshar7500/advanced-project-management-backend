import { Project } from "../models/project.models.js"
import { User } from "../models/user.models.js";
import ApiError from "../utils/Api-error.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const createProject = async (data, userId)=>{
    const { name, description } = data;

    const project = await Project.create({
        name,
        description,
        owner : userId,
        members : [userId]
    })

    return project
}


export const getUserProjects = async(userId)=>{
    const projects = await Project.find({
        isDeleted : false,
        $or : [
            {owner : userId},
            {member : userId}
        ]
    })

    return projects

}


export const addMember = async (projectId, userIdToAdd, currentUserId)=>{
    const project = await Project.findById(projectId)

    if(!projectId || project.isDeleted){
        throw new ApiError(404, "Project not found")
    }

    if(project.owner.toString() !== currentUserId.toString()){
        throw new ApiError(403, "Only owner can add members")
    }

    const user = await User.findById(userIdToAdd)
    if(!user) throw new ApiError(404, "User not found")

    if(project.members.includes(userIdToAdd)){
        throw new ApiError(400, "User already a member")
    }

    project.members.push(userIdToAdd);

    await project.save()

    return project

}


export const removeMember = async (projectId, userIdToRemove, currentUserId)=>{
    const project = await Project.findById(projectId)

     if(!projectId || project.isDeleted){
        throw new ApiError(404, "Project not found")
    }

    if(project.owner.toString() !== currentUserId.toString()){
        throw new ApiError(400, "Only onwer can remove members")
    }

    const user = await User.findById(userIdToRemove)
    if(!user) throw new ApiError(404, "User not found")
    
      project.members = project.members.filter(
        member => member.toString() !== userIdToRemove
    );

    await project.save();

    return project;

}



export const deleteProject = async (projectId, currentUserId)=>{
    const project = await Project.findById(projectId)

    if(!project || project.isDeleted){
        throw new ApiError(404, "Project not found")
    }

    if(project.owner.toString() !== currentUserId.toString()){
        throw new ApiError(401, "Only owner can delete the project")
    }

    project.isDeleted = true
    await project.save()

    return project
}