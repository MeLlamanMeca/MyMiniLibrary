import z from 'zod';

const weaponSchema = z.object({
    name: z.string(),
    range: z.number(),
    attacks: z.string(),
    skill: z.string(),
    strength: z.number(),
    armourPiercing: z.number(),
    damage: z.number()
})

export function validateWeapon(input) {
    return weaponSchema.safeParse(input)
}

export function validateParcialWeapon(input) {
    return weaponSchema.partial().safeParse(input)
}