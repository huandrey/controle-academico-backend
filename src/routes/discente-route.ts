import { AlunoRepository } from '../repositories/aluno-repository'
import { Router } from 'express'
import { AlunoController } from '../controllers/aluno-controller'
import { AlunoService } from '../services/aluno-service'
import { PrismaDatabase } from '../database/prisma-database'
import { AutorizacaoMiddleware } from '../middlewares/autorizacao-middleware'

const router = Router()
const database = new PrismaDatabase();

const discenteRepository = new AlunoRepository(database)
const discenteService = new AlunoService(discenteRepository)
const discenteController = new AlunoController(discenteService)
const middlewareAutorizacao = new AutorizacaoMiddleware()

router.post('/create', middlewareAutorizacao.autorizarApenas('ADMIN'), discenteController.criaAluno.bind(discenteController))
router.post('/update/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), discenteController.atualizaAluno.bind(discenteController))
router.delete('/delete/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), discenteController.deletaAluno.bind(discenteController));

export { router as discenteRoutes }
