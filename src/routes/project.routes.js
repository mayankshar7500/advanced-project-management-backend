import express from "express"
import { createProjectController, getUserProjectsController, addMemberController, removeMemberController, deleteProjectController} from "../controllers/project.controllers.js"
import { verifyJwt } from "../middlewares/auth.middlewares.js"
import { validate } from "../middlewares/validate.middlewares.js"
import { createProjectSchema, memberSchema } from "../validations/project.validation.js"
import { idParamSchema } from "../validations/common.validation.js"

const router = express.Router()

router.post("/", verifyJwt, validate(createProjectSchema) ,createProjectController)

router.get("/", verifyJwt, getUserProjectsController)

router.post("/:id/add-member", verifyJwt, validate(memberSchema), addMemberController)

router.post("/:id/remove-member", verifyJwt ,removeMemberController)

router.post("/:id", verifyJwt, validate(idParamSchema, "params") ,deleteProjectController)

export default router