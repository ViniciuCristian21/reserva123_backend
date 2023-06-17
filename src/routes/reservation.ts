import { FastifyInstance } from 'fastify'
import { date, string, z } from 'zod'
import { prisma } from '../lib/prisma'


export async function reservationRoutes(app: FastifyInstance) {


    app.get("/", async (request) => {
        return "Olá mundo"
    })


    app.post("/reservation/:id", async (request) => {
        
        const paramsSchema = z.object({
            id: string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({
            check_in: z.string().datetime(),
            check_out: z.string().datetime(),
            status: z.string(),
            amount: z.number(),
            id_room: z.string().uuid()
        })

        const {check_in, check_out, status, amount, id_room} = bodySchema.parse(request.body)

        const roomIsReserved = await prisma.reservation.findFirst({
            where: {
                id_room
            }
        })

        if(roomIsReserved) {
            return {
                errorMessage: "Rooms is Ocuped"
            }
        }

        const reserve = await prisma.reservation.create({
            data: {
                check_in,
                check_out,
                status,
                amount,
                id_user: id,
                id_room
            }
        })

        if(reserve){
            const date = new Date()
            await prisma.payment.create({
                data: {
                    amount,
                    payment_at: date,
                    payment_type: "Credit",
                    id_reservation: reserve.id
                }
            })
        }

        return {
            reserve
        }
    })
}