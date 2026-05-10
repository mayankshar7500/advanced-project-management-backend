import { Task } from "../models/task.models.js"
import { Project } from "../models/project.models.js"
import { User } from "../models/user.models.js"
import ApiError from "../utils/Api-error.js"

export const createTask = async (data, currrentUserId)=>{
    const { title, description, project, assignedTo } = data

    const projectData = await Project.findById(project)

    if(!projectData || projectData.isDeleted){
        throw new ApiError(404, "project not found")
    }

    const isMember = projectData.members.some(
        m => m.toString() === currrentUserId.toString()
    )

    if(!isMember){
        throw new ApiError(403, "Not authorized in this project")
    }

    const isAssignedMember = projectData.members.some(
        m => m.toString() === assignedTo
    )

    if (!isAssignedMember) {
        throw new ApiError(400, "User is not part of project");
    }


    const task = await Task.create({
        title,
        description,
        assignedTo,
        project,
        createdBy : currrentUserId
    })

    return task


}


export const getTasks = async (projectId, currentUserId) => {
    const project = await Project.findById(projectId);

    if (!project || project.isDeleted) {
        throw new ApiError(404, "Project not found");
    }

    const isMember =
        project.members.some(
            m => m.toString() === currentUserId.toString()
        ) ||
        project.owner.toString() === currentUserId.toString();

    if (!isMember) {
        throw new ApiError(403, "Unauthorized access");
    }

    const tasks = await Task.find({
        project: projectId,
        isDeleted: false
    })
    .populate("assignedTo", "username email")
    .populate("createdBy", "username email");

    return tasks;
};



export const updateTask = async (taskId, status, currentUserId)=>{
    const task = await Task.findById(taskId).populate("project")

    if(!task || task.isDeleted){
        throw new ApiError(404, "Task not found");
    }


    const isAssigned = task.assignedTo.toString() === currentUserId.toString()

    const isOwner = task.project.owner.toString() === currentUserId.toString()

    if(!isAssigned && !isOwner){
        throw new ApiError(403, "Not allowed to update this task")
    }

    const allowed = ["todo", "in-progress", "done"];
    if (!allowed.includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    task.status = status

    await task.save()

    return task
}


export const deleteTask = async (taskId, currentUserId) => {
    const task = await Task.findById(taskId).populate("project");

    if (!task || task.isDeleted) {
        throw new ApiError(404, "Task not found");
    }

    const isAssigned =
        task.assignedTo &&
        task.assignedTo.toString() === currentUserId.toString();

    const isOwner =
        task.project.owner.toString() === currentUserId.toString();

    if (!isAssigned && !isOwner) {
        throw new ApiError(403, "Not allowed to delete this task");
    }

    task.isDeleted = true;
    await task.save();

    return task;
};