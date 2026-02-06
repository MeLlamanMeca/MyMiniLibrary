import z from 'zod';

const unitSchema = z.object({
    username: z.string().optional(),
    email: z.string(),
    passwordHash: z.string(),
})

export function validateUnit(input) {
    return unitSchema.safeParse(input)
}

export function validateParcialUnit(input) {
    return unitSchema.partial().safeParse(input)
}