import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('cors', () => ({
  default: vi.fn((options) => options)
}))

import { corsPublic } from '../../../app/middlewares/CorsOptions.js'

describe('CorsOptions', () => {
  describe('corsPublic', () => {
    it('should allow all origins for GET', () => {
      expect(corsPublic).toEqual({
        origin: '*',
        methods: ['GET']
      })
    })
  })

  describe('corsPrivate', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      vi.resetModules()
    })

    it('should use CORS_PRIVATE_ORIGINS if defined', async () => {
      vi.stubEnv('CORS_PRIVATE_ORIGINS', 'http://localhost:3000,http://another.com')
      const { corsPrivate } = await import('../../../app/middlewares/CorsOptions.js')

      expect(corsPrivate).toEqual({
        origin: ['http://localhost:3000', 'http://another.com'],
        methods: ["PUT", "DELETE", "PATCH", "POST"],
        credentials: true
      })
    })

    it('should have an empty array for origin if CORS_PRIVATE_ORIGINS is not defined', async () => {
      vi.stubEnv('CORS_PRIVATE_ORIGINS', '')
      const { corsPrivate } = await import('../../../app/middlewares/CorsOptions.js')

      expect(corsPrivate).toEqual({
        origin: [],
        methods: ["PUT", "DELETE", "PATCH", "POST"],
        credentials: true
      })
    })
  })
})
