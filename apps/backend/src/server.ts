import { env } from './config/env.js'
import { createApp } from './app.js'
import cors from '@fastify/cors'

const app = createApp()

app.register(cors, {
  origin: 'http://localhost:3001', // allow requests from your frontend
  methods: ['POST', 'GET'], // specify allowed HTTP methods
  // credentials: true,            // if needed
})

const start = async () => {
  try {
    await app.listen({
      port: env.PORT,
      host: env.HOST || '0.0.0.0',
    })
    console.log(`🚀 Server running on port ${env.PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
