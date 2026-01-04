import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import { env } from './config/env.js'
import { v1Routes } from './routes/v1.js'
import errorHandler from './plugins/error-handler.js'
import notFoundHandler from './plugins/not-found.js'

export function createApp(opts: FastifyServerOptions = {}): FastifyInstance {
  const app = Fastify({
    logger: { level: env.LOG_LEVEL },
    ...opts,
  })

  // Register plugins
  app.register(errorHandler)
  app.register(notFoundHandler)

  // Register routes
  app.register(v1Routes, { prefix: '/api/v1' })

  return app
}
