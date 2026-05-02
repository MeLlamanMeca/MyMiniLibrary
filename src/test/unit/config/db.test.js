import { describe, it, expect, vi } from 'vitest'

const mockPool = vi.fn()
vi.mock('pg', () => {
  return {
    default: {
      Pool: mockPool
    }
  }
})

describe('db config', () => {
  it('should initialize Pool with environment variables', async () => {
    vi.stubEnv('DB_USER', 'testuser')
    vi.stubEnv('DB_HOST', 'localhost')
    vi.stubEnv('DB_NAME', 'testdb')
    vi.stubEnv('DB_PASSWORD', 'password')
    vi.stubEnv('DB_PORT', '5432')
    
    await import('../../../app/config/db.js')

    expect(mockPool).toHaveBeenCalledWith({
      user: 'testuser',
      host: 'localhost',
      database: 'testdb',
      password: 'password',
      port: '5432'
    })
  })
})
