import z from 'zod';

const userSchema = z.object({
    username: z.string(),
    email: z.string(),
    passwordHash: z.string(),
})

export function validateUser(input) {
    return userSchema.safeParse(input)
}

export function validateParcialUser(input) {
    return userSchema.partial().safeParse(input)
}