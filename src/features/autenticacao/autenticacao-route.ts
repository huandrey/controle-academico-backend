import { Router } from 'express'
import { PrismaDatabase } from '../../shared/database/prisma-database'
import { AutenticacaoController } from './autenticacao-controller'
import { AutenticacaoService } from './autenticacao-service'
import { AutenticacaoRepository } from './autenticacao-repository'

const router = Router()
const database = new PrismaDatabase();

const autenticacaoRepository = new AutenticacaoRepository(database)
const autenticacaoService = new AutenticacaoService(autenticacaoRepository)
const autenticacaoController = new AutenticacaoController(autenticacaoService)

router.post('/gera-token', autenticacaoController.gerarToken.bind(autenticacaoController))

export { router as autenticacaoRoutes }
