import { type FastifyInstance } from 'fastify'

export async function v1Routes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return { message: 'API is running', version: 'v1' }
  })
}
