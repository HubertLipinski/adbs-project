import {FastifyPluginAsync} from 'fastify'
import bcrypt from 'bcrypt'

const authRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    console.log(opts)

    fastify.post('/register', {
        ...opts,
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: {type: 'string', minLength: 3},
                    email: {type: 'string'},
                    password: {type: 'string'},
                },
                required: ['name', 'email', 'password'],
            }
        }
    }, async function (request, reply) {
        const { name, email, password } = request.body as {
            name: string
            email: string
            password: string
        }

        const users = fastify.mongo.db!.collection('users')

        const existing = await users.findOne({ email })

        if (existing) {
            return reply.status(400).send({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await users.insertOne({ name, email, password: hashedPassword })

        const token = fastify.jwt.sign({
            id: result.insertedId,
            email,
            name
        })

        return reply.send({ token })
    })
}

export default authRoutes
