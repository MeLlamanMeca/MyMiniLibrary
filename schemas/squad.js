import z from 'zod';

const squadSchema = z.object({
    name: z.string(),
    move: z.number(),
    toughness: z.number(),
    save: z.string(),
    wounds: z.number(),
    leadership: z.string(),
    control: z.number(),
    composition: z.string(),
    compositionInfo: z.string(),
    compositionOptions: z.string(),
    abilities: z.string(),
    ppu: z.number(),
    imageUrl: z.string(),
})

export function validateSquad(input) {
    return squadSchema.safeParse(input)
}

export function validateParcialSquad(input) {
    return squadSchema.partial().safeParse(input)
}