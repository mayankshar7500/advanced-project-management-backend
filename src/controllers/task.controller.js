import { createTask, getTasks, updateTask, deleteTask } from "../services/task.service.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const createTaskController = asyncHandler( async(req, res)=>{

    const task = await createTask(req.body, req.user._id)

    res.status(200).json({
        success : true,
        task
    })
})


export const getTasksController = asyncHandler(async (req, res) => {
    const { projectId } = req.query;

    const tasks = await getTasks(projectId, req.user._id);

    res.status(200).json({
        success: true,
        tasks
    });
});



export const updateTaskController = asyncHandler( async (req, res)=>{
    const { id } = req.params
    const { status } = req.body

    const task = await updateTask(id, status, req.user._id)

    res.status(200).json({
        success : true,
        task
    })
})


export const deleteTaskController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await deleteTask(id, req.user._id);

    res.status(200).json({
        success: true,
        message: "Task deleted successfully"
    });
});
