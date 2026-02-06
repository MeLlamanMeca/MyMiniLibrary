import z from 'zod';

const userSchema = z.object({
    username: z.string().optional(),
    email: z.string(),
    passwordHash: z.string(),
})

export function validateRecipe(input) {
    return userSchema.safeParse(input)
}

export function validateParcialRecipe(input) {
    return userSchema.partial().safeParse(input)
}