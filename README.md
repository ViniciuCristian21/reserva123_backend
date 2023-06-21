# Projeto API para reservas em um hotel (Reserva123)

## Tecnologias usadas

- Node 
- Typescript
- Prisma
- Fastify
- Authenticação JWT

## Sobre

Projeto feito com a intuição de aprender mais sobre essas tecnologias ditas acima e por em pratica alguns conhecimentos.

## Iniciando o projeto
```
git clone https://github.com/ViniciuCristian21/reserva123_backend.git

npm install

npm run dev
```

## Rotas | Exemplos
```
Users
    |
Create Users -> http://localhost:3333/user | POST
body {
    "name": "", -> string
    "email": "", -> string
    "password": "", -> string
    "phone": "", -> string
    "address": "" -> string
}

Update Users -> http://localhost:3333/user/:id | PUT
headers {
    token: 'Barer 2626ds6a6d6a6d6a6d26a2d62a62d6a26d2a62d6a62d6a26d2a62d6a26d26a2d6a62d6a6d2a62d6a6da6'
}
body {
    "name": "", -> string
    "email": "", -> string
    "password": "", -> string
    "phone": "", -> string
    "address": "" -> string
}

Get All Users -> http://localhost:3333/user/:id | GET
headers {
    token: 'Barer 2626ds6a6d6a6d6a6d26a2d62a62d6a26d2a62d6a62d6a26d2a62d6a26d26a2d6a62d6a6d2a62d6a6da6'
}

Reservation
    |
Create Reservation -> http://localhost:3333/reservation/:id | POST
headers {
    token: 'Barer 2626ds6a6d6a6d6a6d26a2d62a62d6a26d2a62d6a62d6a26d2a62d6a26d26a2d6a62d6a6d2a62d6a6da6'
}
body {
    "check_in": "", -> date
    "check_out": "", -> date
    "status": "", -> string
    "amount": "", -> number
    "id_room": "" -> string
}

Room
    |
Crate Room -> http://localhost:3333/room | POST
headers {
    token: 'Barer 2626ds6a6d6a6d6a6d26a2d62a62d6a26d2a62d6a62d6a26d2a62d6a26d26a2d6a62d6a6d2a62d6a6da6'
}
body {
    "number": "", -> string
    "type": "", -> string
    "capacity": "", -> number
    "description": "", -> string
    "price": "" -> number
}

Get All Rooms -> http://localhost:3333/rooms | GET
headers {
    token: 'Barer 2626ds6a6d6a6d6a6d26a2d62a62d6a26d2a62d6a62d6a26d2a62d6a26d26a2d6a62d6a6d2a62d6a6da6'
}
