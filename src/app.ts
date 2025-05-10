import { join } from 'node:path'
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify'
import jwt from '@fastify/jwt'
import dotenv from 'dotenv'

dotenv.config()

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {
  logger: true,
}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {

  fastify.register(jwt, {
    secret: process.env.JWT_SECRET as string,
  })

  // eslint-disable-next-line no-void
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // eslint-disable-next-line no-void
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })
}

export default app
export { app }
