export default class UnitModel {

    constructor({ pool }) {
        this.pool = pool
    }

    async find( {userId, faction, subfaction} ) {
        try {
            let query = 'SELECT * FROM "Unit" WHERE "userId" = $1'
            const params = [userId]
            
            if (subfaction) {
                query += ' AND subfaction = $2'
                params.push(subfaction)
            } else if (faction) {
                query += ' AND faction = $2'
                params.push(faction)
            }
            return await this.pool.query(query, params)
        } 
        catch (err) { console.error('Error finding units:', err) }
    }

    async findById({ id }) {
        try {
            const query = 'SELECT * FROM "Unit" WHERE id = $1'
            return await this.pool.query(query, [id])
        } 
        catch (err) { console.error('Error finding unit by id:', err) }
    }

    async findByName({ name }) {
        try {
            const query = 'SELECT * FROM "Unit" WHERE name = $1'
            return await this.pool.query(query, [name])
        }
        catch (err) { console.error('Error finding unit by name:', err) }
    }
    async create({ name, faction, subfaction, userId }) {
        try {
            const query = 'INSERT INTO "Unit" (name, faction, subfaction, "userId") VALUES ($1, $2, $3, $4) RETURNING *'
            return await this.pool.query(query, [name, faction, subfaction, userId])
        }
        catch (err) { console.error('Error creating unit:', err) }
    }
    async update({ id, name, faction, subfaction, type, squadId }) {
        try {
            const query = `UPDATE "Unit" SET
                name = COALESCE($1, name),
                faction = COALESCE($2, faction),
                subfaction = COALESCE($3, subfaction),
                type = COALESCE($4, type),
                squadId = COALESCE($5, squadId)
                WHERE id = $6`
            return await this.pool.query(query, [name, faction, subfaction, type, squadId, id])
        }
        catch (err) { console.error('Error updating unit:', err) }
    }
    async delete({ id }) {
        try {
            const query = 'DELETE FROM "Unit" WHERE id = $1'
            return await this.pool.query(query, [id])
        }
        catch (err) { console.error('Error deleting unit:', err) }
    }
}