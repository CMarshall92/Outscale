import { test, expect, beforeAll, afterAll } from 'vitest'
import { createApp } from '../app'
import { FastifyInstance } from 'fastify'

let app: FastifyInstance

beforeAll(async () => {
  app = createApp({ logger: false }) // Disable logging for tests
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test('GET /api/v1/health should return API status', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/health',
  })

  expect(response.statusCode).toBe(200)

  const data = response.json()

  expect(data.status).toBe('ok')
  expect(data.version).toBe('v1')

  expect(data.timestamp).toBeDefined()
  expect(typeof data.timestamp).toBe('string')
  expect(new Date(data.timestamp).getTime()).toBeGreaterThan(0) // Valid date

  expect(data.uptime).toBeDefined()
  expect(typeof data.uptime).toBe('number')
  expect(data.uptime).toBeGreaterThan(0)
})

test('GET /api/v1/ should return API info', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/',
  })

  expect(response.statusCode).toBe(200)

  const data = response.json()
  expect(data).toEqual({
    message: 'API is running',
    version: 'v1',
  })
})

test('GET /api/v1/ should return JSON content-type', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/',
  })

  expect(response.headers['content-type']).toMatch(/application\/json/)
})
