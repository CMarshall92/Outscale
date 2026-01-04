import { FastifyInstance, FastifyError } from 'fastify'
import fp from 'fastify-plugin'

async function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    const { statusCode = 500, message } = error

    fastify.log.error(error)

    // Don't expose internal errors in production
    const response = {
      error:
        statusCode >= 500 && process.env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : message,
      statusCode,
      timestamp: new Date().toISOString(),
    }

    reply.status(statusCode).send(response)
  })
}

export default fp(errorHandler)
