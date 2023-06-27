
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'


export async function roomRoutes(app: FastifyInstance) {

    app.get("/rooms", async (request) => {

        await request.jwtVerify()
        
        const rooms = await prisma.room.findMany()

        return rooms
    })
    
    app.post("/room", async (request) => {

        await request.jwtVerify()

        const paramsSchema = z.object({
            number: z.string(),
            type: z.string(),
            capacity: z.number(),
            description: z.string(),
            price: z.number()
        })

        const { number, type, capacity, description, price } = paramsSchema.parse(request.body)


        const room = await prisma.room.create({
            data: {
                number,
                type,
                capacity,
                description,
                price
            }
        })
        return {
            room
        }
    })
}