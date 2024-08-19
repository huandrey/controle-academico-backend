import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { userRoutes } from './routes/user-route'
import { disciplinaRoutes } from './routes/disciplina-route'
import { discenteRoutes } from './routes/discente-route'

const prisma = new PrismaClient()

const app = express()
const port = 3000

app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

async function main() {}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

app.use('/api/users', userRoutes)
app.use('/api/discentes', discenteRoutes)
app.use('/api/disciplinas', disciplinaRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo a API do Controle Acadêmico!')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`)
})
