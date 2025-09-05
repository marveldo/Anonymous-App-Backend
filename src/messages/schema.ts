import zod from "zod";

export const createmessageschema = zod.object({
    message : zod.string().min(1).max(500).optional(),
}).strict()

