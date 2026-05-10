import express from "express"
import { verifyJwt } from "../middlewares/auth.middlewares.js"
import { createTaskController, getTasksController, updateTaskController, deleteTaskController } from "../controllers/task.controller.js"
import { validate } from "../middlewares/validate.middlewares.js"
import { createTaskSchema, updateTaskSchema } from "../validations/task.validation.js"

const router = express.Router()

router.post("/", verifyJwt, validate(createTaskSchema), createTaskController)

router.get("/", verifyJwt, getTasksController)

router.patch("/:id", verifyJwt, validate(updateTaskSchema), updateTaskController)

router.delete("/:id", verifyJwt, deleteTaskController);

export default router