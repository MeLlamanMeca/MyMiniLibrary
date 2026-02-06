export default class SquadModel {

    constructor({ pool }) {
        this.pool = pool
    }

    async find({ id }) {
        try {
            const query = 'SELECT * FROM "Squad" WHERE id = $1'
            const result = await this.pool.query(query, [id])
            return result.rows
        } 
        catch (err) { console.error('Error finding Squads:', err) }
    }

    async create({ name, move, toughness, save, wounds, leadership, control, composition, compositionInfo, compositionOptions, abilities, ppu, imageUrl }) {
        try {
            const query = 'INSERT INTO "Squad" (name, move, toughness, save, wounds, leadership, control, composition, "compositionInfo", "compositionOptions", abilities, ppu, "imageUrl") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *'
            const result = await this.pool.query(query, [name, move, toughness, save, wounds, leadership, control, composition, compositionInfo, compositionOptions, abilities, ppu, imageUrl])
            return result.rows
        }
        catch (err) { console.error('Error creating Squad:', err) }
    }
    async update({ id, name, move, toughness, save, wounds, leadership, control, composition, compositionInfo, compositionOptions, abilities, ppu, imageUrl }) {
        try {
            const query = `UPDATE "Squad" SET
                name = COALESCE($1, name),
                move = COALESCE($2, move),
                toughness = COALESCE($3, toughness),
                save = COALESCE($4, save),
                wounds = COALESCE($5, wounds),
                leadership = COALESCE($6, leadership),
                control = COALESCE($7, control),
                composition = COALESCE($8, composition),
                "compositionInfo" = COALESCE($9, "compositionInfo"),
                "compositionOptions" = COALESCE($10, "compositionOptions"),
                abilities = COALESCE($11, abilities),
                ppu = COALESCE($12, ppu),
                "imageUrl" = COALESCE($13, "imageUrl")
                WHERE id = $14`
            const result = await this.pool.query(query, [name, move, toughness, save, wounds, leadership, control, composition, compositionInfo, compositionOptions, abilities, ppu, imageUrl, id])
            return result.rows
        }
        catch (err) { console.error('Error updating Squad:', err) }
    }
    async delete({ id }) {
        try {
            const query = 'DELETE FROM "Squad" WHERE id = $1'
            const result = await this.pool.query(query, [id])
            return result.rows
        }
        catch (err) { console.error('Error deleting Squad:', err) }
    }
}