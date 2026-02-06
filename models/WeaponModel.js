export default class WeaponModel {

    constructor({ pool }) {
        this.pool = pool
    }


    async find({ id }) {
        try {
            const query = 'SELECT * FROM "Weapon" WHERE id = $1'
            const result = await this.pool.query(query, [id])
            return result.rows
        } 
        catch (err) { console.error('Error getting info:', err) }
    }

    async create({ name, range, attacks, skill, strength, armourPiercing, damage }) {
        try {
            const query = 'INSERT INTO "Weapon" (name, range, attacks, skill, strength, "armourPiercing", damage) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
            const result = await this.pool.query(query, [name, range, attacks, skill, strength, armourPiercing, damage])
            return result.rows
        }
        catch (err) { console.error('Error creating info:', err) }
    }

    async update({ id, name, range, attacks, skill, strength, armourPiercing, damage }) {
        try {
            const query = 'UPDATE "Weapon" SET name = COALESCE($1,name), range = COALESCE($2,range), attacks = COALESCE($3,attacks), skill = COALESCE($4,skill), strength = COALESCE($5,strength), "armourPiercing" = COALESCE($6,"armourPiercing"), damage = COALESCE($7,damage) WHERE id = $8 RETURNING *'
            const result = await this.pool.query(query, [name, range, attacks, skill, strength, armourPiercing, damage, id])
            return result.rows
        }
        catch (err) { console.error('Error updating info:', err) }
    }

    async remove({ id }) {
        try {
            const query = 'DELETE FROM "Weapon" WHERE id = $1 RETURNING *'
            const result = await this.pool.query(query, [id])
            return result.rows
        }
        catch (err) { console.error('Error deleting info:', err) }
    }
    
}