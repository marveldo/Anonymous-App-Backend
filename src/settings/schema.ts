import z from "zod";

export const settingsschema = z.object({
     paused : z.boolean().optional()
}).strict()

