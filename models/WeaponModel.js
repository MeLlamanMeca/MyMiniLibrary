export default class WeaponModel {

    constructor({ pool }) {
        this.pool = pool
    }


    async get({ squadId }) {
        try {
            const query = 'SELECT * FROM weapons WHERE squad_id = $1'
            return await this.this.pool.query(query, [squadId])
        } 
        catch (err) { console.error('Error getting info:', err) }
    }

    async create({ name, range, attacks, skill, strength, armourPiercing, damage }) {
        try {
            const query = 'INSERT INTO weapons (name, range, attacks, skill, strength, armour_piercing, damage) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
            return await this.this.pool.query(query, [name, range, attacks, skill, strength, armourPiercing, damage])
        }
        catch (err) { console.error('Error creating info:', err) }
    }

    async update({ id, name, range, attacks, skill, strength, armourPiercing, damage }) {
        try {
            const query = 'UPDATE weapons SET name = COALESCE($1,name), range = COALESCE($2,range), attacks = COALESCE($3,attacks), skill = COALESCE($4,skills), strength = COALESCE($5,strength), armour_piercing = COALESCE($6,armour_piercing), damage = COALESCE($7,damage) WHERE id = $8 RETURNING *'
            return await this.this.pool.query(query, [name, range, attacks, skill, strength, armourPiercing, damage, id])
        }
        catch (err) { console.error('Error updating info:', err) }
    }

    async remove({ id }) {
        try {
            const query = 'DELETE FROM weapons WHERE id = $1 RETURNING *'
            return await this.this.pool.query(query, [id])
        }
        catch (err) { console.error('Error deleting info:', err) }
    }
    
}