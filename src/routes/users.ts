import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import  { hash } from 'bcryptjs'

export async function userRoutes(app: FastifyInstance) {

    app.get("/users", async (request) => {

        await request.jwtVerify()

        const users = await prisma.user.findMany()
        return users
    })

    app.post("/user", async (request) => {

        const userSchema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
            phone: z.string(),
            address: z.string()
        })

        const { name, email, password, phone, address} = userSchema.parse(request.body)

        const emailAllReadyExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(emailAllReadyExists) {
            return {
                errorMessage: "email allready existis"
            }
        }

        const passwordHash = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
                phone,
                address
            }
        })

        return user
    })

    app.put("/user/:id", async (request) => {
        
        await request.jwtVerify()

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(request.params)

        const bodySchema = z.object({
            name: z.string(),
            email: z.string(),
            phone: z.string(),
            address: z.string()
        })

        const { name, email, phone, address } = bodySchema.parse(request.body)

        const emailAllReadyExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(emailAllReadyExists) {
            return {
                errorMessage: "Email all ready exists"
            }
        }

        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                phone,
                address
            }
        })

        return user
    })
}
