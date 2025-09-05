import z from "zod"

export const usercreateschema = z.object({
    username : z.string().max(30).min(3)
}).strict()

export const userupdatescema = z.object({
    username : z.string().max(30).min(3).optional()
}).strict()

