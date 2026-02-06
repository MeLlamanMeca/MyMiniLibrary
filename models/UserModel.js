export default class UserModel {

    constructor({ pool }) {
        this.pool = pool
    }

    async getAll() {
        //todo
    }

    async getInfo({ id }) {
        try {
            const query = '' //TODO: cambiar query
            return await this.pool.query(query)
        } 
        catch (err) { console.error('Error getting info:', err) }
    }

    async verify({ email, passwordHash }) {
        try {
            const query = 'SELECT id, username, email FROM "User" WHERE email = $1 AND "passwordHash" = $2'
            return await this.pool.query(query, [email, passwordHash])
        } 
        catch (err) { console.error('Error verifying user:', err) }
    }

    async create({ username, email, passwordHash }) {
        try {
            const query = 'INSERT INTO "User" (username, email, "passwordHash") VALUES ($1, $2, $3) RETURNING id, username, email'
            return await this.pool.query(query, [username, email, passwordHash])
        } 
        catch (err) { console.error('Error creating user:', err) }
    }
}