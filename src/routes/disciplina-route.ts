import { DisciplinaRepository } from './../repositories/disciplina-repository'
import { Router } from 'express'
import { DisciplinaService } from '../services/disciplina-service'
import { PrismaDatabase } from '../database/prisma-database'
import { DisciplinaController } from '../controllers/disciplina-controller'
import { AutorizacaoMiddleware } from '../middlewares/autorizacao-middleware'

const router = Router()
const database = new PrismaDatabase();

const disciplinaRepository = new DisciplinaRepository(database)
const disciplinaService = new DisciplinaService(disciplinaRepository)
const disciplinaController = new DisciplinaController(disciplinaService)
const middlewareAutorizacao = new AutorizacaoMiddleware()

router.post('/create', middlewareAutorizacao.autorizarApenas('ADMIN'), disciplinaController.criaDisciplina.bind(disciplinaController))
router.post('/update/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), disciplinaController.atualizaDisciplina.bind(disciplinaController))
router.delete('/delete/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), disciplinaController.deletaDisciplina.bind(disciplinaController));

export { router as disciplinaRoutes }
