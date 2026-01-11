import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import { env } from './config/env.js'
import { v1Routes } from './routes/v1.js'
import { teams } from './routes/teams.js'
import { health } from './routes/health.js'
import { connections } from './routes/connections.js'
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
  app.register(teams, { prefix: '/api/v1/teams' })
  app.register(health, { prefix: '/api/v1/health' })
  app.register(connections, { prefix: '/api/v1/connections' })

  return app
}
