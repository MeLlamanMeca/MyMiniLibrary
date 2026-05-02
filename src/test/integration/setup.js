const miniRows = new Map();

export const testPool = {
  query: async (sql, params = []) => {
    if (sql === 'SELECT * FROM "Mini" WHERE id = $1') {
      const id = Number.parseInt(params[0], 10);
      return {
        rows: miniRows.has(id) ? [miniRows.get(id)] : [],
      };
    }

    throw new Error(`Unexpected query in integration test pool: ${sql}`);
  },
  end: async () => {},
};

export const setupTestDb = async () => {
  console.log('Setting up test database...');
  await cleanupDb();
  await seedDb();
  console.log('Test database setup complete.');
};

export const teardownTestDb = async () => {
  console.log('Tearing down test database...');
  await cleanupDb();
  console.log('Test database teardown complete.');
};

export const cleanupDb = async () => {
  miniRows.clear();
};

export const seedDb = async () => {
  miniRows.set(1, { id: 1, name: 'Space Marine Test' });
  miniRows.set(2, { id: 2, name: 'Ork Boy Test' });
};
