import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { autenticacaoRoutes } from './features/autenticacao/autenticacao-route'
import { usuarioRoutes } from './features/usuarios/usuario-route'
import { alunoRoutes } from './features/alunos/aluno-route'
import { disciplinaRoutes } from './features/disciplinas/disciplina-route'
import { sessaoRoutes } from './features/sessoes/sessao-route'

const prisma = new PrismaClient()

const app = express()
const port = 7777

app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

async function main() { }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

app.use('/api/auth', autenticacaoRoutes)
app.use('/api/users', usuarioRoutes)
app.use('/api/discentes', alunoRoutes)
app.use('/api/disciplinas', disciplinaRoutes)
app.use('/api', sessaoRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo a API do Controle Acadêmico!')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`)
})
