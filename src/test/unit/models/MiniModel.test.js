import { describe, it, expect, vi, beforeEach } from 'vitest'
import MiniModel from '../../../app/models/MiniModel.js'

const mockPool = {
  query: vi.fn()
}

describe('MiniModel', () => {
  let model

  beforeEach(() => {
    vi.clearAllMocks()
    model = new MiniModel({ pool: mockPool })
  })

  describe('get', () => {
    it('should return a mini if it exists', async () => {
      const mockResult = {
        rows: [{ id: 1, name: 'Space Marine' }]
      }
      mockPool.query.mockResolvedValue(mockResult)

      const result = await model.get({ id: 1 })

      expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM "Mini" WHERE id = $1', [1])
      expect(result).toEqual(mockResult.rows[0])
    })

    it('should return null if mini does not exist', async () => {
      const mockResult = {
        rows: []
      }
      mockPool.query.mockResolvedValue(mockResult)

      const result = await model.get({ id: 999 })

      expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM "Mini" WHERE id = $1', [999])
      expect(result).toBeNull()
    })

    it('should throw error if query fails', async () => {
      const error = new Error('DB Error')
      mockPool.query.mockRejectedValue(error)

      await expect(model.get({ id: 1 })).rejects.toThrow('DB Error')
    })
  })
})
