import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

async function notFoundHandler(fastify: FastifyInstance) {
  fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      error: 'Not Found',
      message: `Route ${request.method}:${request.url} not found`,
      statusCode: 404,
      timestamp: new Date().toISOString(),
    })
  })
}

export default fp(notFoundHandler)
