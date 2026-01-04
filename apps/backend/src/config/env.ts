import { z as zod } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = zod.object({
  NODE_ENV: zod.enum(['development', 'test', 'staging', 'production']).default('development'),
  PORT: zod
    .string()
    .transform((val) => parseInt(val, 10))
    .default(3000),
  HOST: zod.string(),
  LOG_LEVEL: zod.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
})

const parseEnv = () => {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error('Invalid env params:')
    if (error instanceof zod.ZodError) {
      error.issues.forEach((err) => {
        console.error(` - ${err.path.join('.')}: ${err.message}`)
      })
    }
    process.exit(1)
  }
}

export const env = parseEnv()
export type ENV = zod.infer<typeof envSchema>
