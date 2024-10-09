import { Router } from 'express'
import { DisciplinaService } from './disciplina-service'
import { DisciplinaController } from './disciplina-controller'
import { PrismaDatabase } from '../../shared/database/prisma-database'
import { AutorizacaoMiddleware } from '../../shared/middlewares/autorizacao-middleware'
import { DisciplinaRepository } from './../../features/disciplinas/disciplina-repository'

const router = Router()
const database = new PrismaDatabase();

const middlewareAutorizacao = new AutorizacaoMiddleware()
const disciplinaRepository = new DisciplinaRepository(database)
const disciplinaService = new DisciplinaService(disciplinaRepository)
const disciplinaController = new DisciplinaController(disciplinaService)

router.post('/create', middlewareAutorizacao.autorizarApenas('ADMIN'), disciplinaController.criaDisciplina.bind(disciplinaController))
router.post('/update', middlewareAutorizacao.autorizarApenas('ADMIN'), disciplinaController.atualizaDisciplina.bind(disciplinaController))
router.delete('/delete', middlewareAutorizacao.autorizarApenas('ADMIN'), disciplinaController.deletaDisciplina.bind(disciplinaController));

export { router as disciplinaRoutes }
