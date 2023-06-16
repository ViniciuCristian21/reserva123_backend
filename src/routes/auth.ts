
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { compare } from 'bcryptjs'


export async function authRoutes(app: FastifyInstance) {
    app.post("/login", async (request, reply) => {
        const bodySchema = z.object({
            email: z.string(),
            password: z.string()
        })

        const { email, password } = bodySchema.parse(request.body)

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!user) {
            return reply.status(400).send({
                messageError: "email does not exist"
            })
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            return reply.status(400).send({
                messageError: "Email/Password Incorrect"
            })
        }

        const token = app.jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            {
                sub: user.id,
                expiresIn: '30 days'
            },
        )

        return {
            token
        }
    })

}