import { addMember, createProject, getUserProjects, removeMember, deleteProject } from "../services/project.services.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const createProjectController = asyncHandler( async (req, res)=>{
    const project = await createProject(req.body, req.user._id);

    res.status(201).json({
        success : true,
        project
    })
})


export const getUserProjectsController = asyncHandler( async (req, res)=>{
    const projects = await getUserProjects(req.user._id)

    res.status(200).json({
        success : true,
        projects
    })
})


export const addMemberController = asyncHandler( async (req, res)=>{
    const { id } = req.params;
    const { userId } = req.body

    const project = await addMember(id, userId, req.user._id)

    res.status(200).json({
        success : true,
        project
    })
})



export const removeMemberController = asyncHandler( async(req, res)=>{
    const { id } = req.params;
    const { userId } = req.body

    const project = await removeMember(id, userId, req.user._id)

    res.status(200).json({
        success : true,
        project
    })
})


export const deleteProjectController = asyncHandler( async (req, res)=>{
    const { id } = req.params
    
    const project = await deleteProject(id, req.user._id)

    res.status(200).json({
        success : true,
        message : "Project deleted successfully"
    })
})