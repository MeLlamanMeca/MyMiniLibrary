import z from 'zod';

const unitSchema = z.object({
    name: z.string(),
    faction: z.string(),
    subfaction: z.string(),
    type: z.string(),
    squadId: z.number(),
    userId: z.number(),
    imageUrl: z.string()
})

export function validateUnit(input) {
    return unitSchema.safeParse(input)
}

export function validateParcialUnit(input) {
    return unitSchema.partial().safeParse(input)
}