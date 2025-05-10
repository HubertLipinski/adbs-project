import fp from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

import dotenv from 'dotenv'
dotenv.config()

export default fp(async (fastify, opts) => {
    fastify.register(fastifyMongo, {
        forceClose: true,
        url: `${process.env.MONGODB_URI}`,
    })

    fastify.log.info('MongoDB connection started')
})

