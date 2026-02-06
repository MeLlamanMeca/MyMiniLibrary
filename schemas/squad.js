import z from 'zod';

const squadSchema = z.object({
    username: z.string().optional(),
    email: z.string(),
    passwordHash: z.string(),
})

export function validateSquad(input) {
    return squadSchema.safeParse(input)
}

export function validateParcialSquad(input) {
    return squadSchema.partial().safeParse(input)
}