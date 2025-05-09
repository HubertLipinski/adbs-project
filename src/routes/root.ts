import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {

    // @ts-ignore
    const data = fastify.mongo.db.collection('users').findOne({})

    return data
  })
}

export default root
