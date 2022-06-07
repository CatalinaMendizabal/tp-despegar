import { PrismaClient } from '@prisma/client'
import express from 'express'
import routes from "./index";

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(routes);

app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)
