import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MiniController } from '../../../app/controllers/MiniController.js'

const mockMiniModel = {
  get: vi.fn()
}

const mockRes = {
  status: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis()
}

const mockNext = vi.fn()

let controller

beforeEach(() => {
  vi.clearAllMocks()
  controller = new MiniController({ miniModel: mockMiniModel })
})

describe('MiniController', () => {
  describe('getMini', () => {
    it('should return 400 if id is not a number', async () => {
      const req = { params: { id: 'abc' } }

      await controller.getMini(req, mockRes, mockNext)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid ID' })
    })

    it('should return 404 if mini is not found', async () => {
      const req = { params: { id: '1' } }
      mockMiniModel.get.mockResolvedValue(null)

      await controller.getMini(req, mockRes, mockNext)

      expect(mockRes.status).toHaveBeenCalledWith(404)
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Mini not found' })
    })

    it('should return the mini if found', async () => {
      const req = { params: { id: '1' } }
      const mini = { id: 1, name: 'Space Marine' }
      mockMiniModel.get.mockResolvedValue(mini)

      await controller.getMini(req, mockRes, mockNext)

      expect(mockRes.json).toHaveBeenCalledWith(mini)
    })

    it('should call next on unexpected error', async () => {
      const req = { params: { id: '1' } }
      const error = new Error('DB exploded')
      mockMiniModel.get.mockRejectedValue(error)

      await controller.getMini(req, mockRes, mockNext)

      expect(mockNext).toHaveBeenCalledWith(error)
    })
  })

  describe('createMini', () => {
    it('should return 200 with in progress message', async () => {
      await controller.createMini({}, mockRes, mockNext)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'In progress' })
    })
  })

  describe('updateMini', () => {
    it('should return 200 with in progress message', async () => {
      await controller.updateMini({}, mockRes, mockNext)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'In progress' })
    })
  })

  describe('deleteMini', () => {
    it('should return 200 with in progress message', async () => {
      await controller.deleteMini({}, mockRes, mockNext)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'In progress' })
    })
  })
})