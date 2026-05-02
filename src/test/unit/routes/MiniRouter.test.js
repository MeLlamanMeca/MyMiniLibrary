import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MiniRouter } from '../../../app/routes/MiniRouter.js'

const mockRouter = {
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn()
}

vi.mock('express', () => ({
  Router: () => mockRouter
}))

vi.mock('../controllers/MiniController.js', () => {
  return {
    MiniController: vi.fn().mockImplementation(() => ({
      getMini: vi.fn(),
      createMini: vi.fn(),
      updateMini: vi.fn(),
      deleteMini: vi.fn()
    }))
  }
})

describe('MiniRouter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should set up routes correctly', () => {
    const mockMiniModel = {}
    const router = MiniRouter({ miniModel: mockMiniModel })

    expect(router).toBe(mockRouter)
    expect(mockRouter.get).toHaveBeenCalledWith('/:id', expect.anything(), expect.anything())
    expect(mockRouter.post).toHaveBeenCalledWith('/', expect.anything(), expect.anything(), expect.anything())
    expect(mockRouter.patch).toHaveBeenCalledWith('/:id', expect.anything(), expect.anything(), expect.anything())
    expect(mockRouter.delete).toHaveBeenCalledWith('/:id', expect.anything(), expect.anything(), expect.anything())
  })
})
