import fastify from "fastify";
import cors from '@fastify/cors'
import { userRoutes } from "./routes/users";
import { authRoutes } from "./routes/auth";
import jwt from '@fastify/jwt'

const app = fastify()

app.register(cors, {
    origin: true
})
app.register(jwt, {
    secret: "mysecret"
})

app.register(authRoutes)
app.register(userRoutes)


app.listen({
    port: 3333
})
.then(() => {
    console.log('server is runing')
})
.catch(err => {
    console.log(err)
})