export default class MiniModel {
  constructor({ pool }) {
    this.pool = pool;
  }

  async get({ id }) {
    const query = 'SELECT * FROM "Mini" WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows[0] ?? null;
  }
}
