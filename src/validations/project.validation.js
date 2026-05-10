import { z } from "zod";

export const createProjectSchema = z.object({
    name: z
        .string()
        .min(3, "Project name must be at least 3 characters"),

    description: z
        .string()
        .optional()
});



export const memberSchema = z.object({

    userId: z
        .string()
        .min(1, "User ID is required")
});