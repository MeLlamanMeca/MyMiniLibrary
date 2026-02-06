export default class UserModel {

    constructor({ pool }) {
        this.pool = pool
    }

    async getAll() {
        try {
            const query = 'SELECT id, username, email FROM "User"'
            const result = await this.pool.query(query)
            return result.rows
        }
        catch (err) { console.error('Error getting users:', err) }
    }

    async getInfo({ id }) {
        try {
            const query = 'SELECT id, username, email FROM "User" WHERE id = $1'
            const result = await this.pool.query(query, [id])
            return result.rows
        } 
        catch (err) { console.error('Error getting info:', err) }
    }

    async verify({ email, passwordHash }) {
        try {
            const query = 'SELECT id, username, email FROM "User" WHERE email = $1 AND "passwordHash" = $2'
            const result = await this.pool.query(query, [email, passwordHash])
            return result.rows
        } 
        catch (err) { console.error('Error verifying user:', err) }
    }

    async create({ username, email, passwordHash }) {
        try {
            const query = 'INSERT INTO "User" (username, email, "passwordHash") VALUES ($1, $2, $3) RETURNING id, username, email'
            const result = await this.pool.query(query, [username, email, passwordHash])
            return result.rows
        } 
        catch (err) { console.error('Error creating user:', err) }
    }
}