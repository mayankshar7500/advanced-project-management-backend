import express from "express"
import morgan from "morgan"
import helmet from "helmet"

const app = express();

app.use(morgan("dev"))
app.use(helmet())

app.use(express.json());

import authRoutes from "./routes/auth.routes.js"
app.use("/api/auth", authRoutes)

import projectRoutes from "./routes/project.routes.js"
app.use("/api/projects", projectRoutes)

import taskRoutes from "./routes/task.routes.js"
app.use("/api/task", taskRoutes)

app.get("/", (req, res) => {
    res.send("Project Management API Running");
});

export default app;
