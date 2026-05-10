import { z } from "zod";

export const createTaskSchema = z.object({

    title: z
        .string()
        .min(3, "Task title must be at least 3 characters"),

    description: z
        .string()
        .optional(),

    project: z
        .string()
        .min(1, "Project ID is required"),

    assignedTo: z
        .string()
        .min(1, "Assigned user is required"),

    priority: z
        .enum(["low", "medium", "high"])
        .optional(),

    dueDate: z
        .string()
        .optional()
});

export const updateTaskSchema = z.object({

    status: z.enum([
        "todo",
        "in-progress",
        "done"
    ])
});