import fastify from "fastify";
import cors from '@fastify/cors'

const app = fastify()

app.register(cors, {
    origin: true
})


app.get("/", (request) => {

    return "Olá mundo"
})


app.listen({
    port: 3333
})
.then(() => {
    console.log('server is runing')
})
.catch(err => {
    console.log(err)
})