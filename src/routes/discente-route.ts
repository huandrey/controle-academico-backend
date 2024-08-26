import { DiscenteRepository } from './../repositories/discente-repository'
import { Router } from 'express'
import { DiscenteController } from '../controllers/discente-controller'
import { DiscenteService } from '../services/discente-service'
import { PrismaDatabase } from '../database/prisma-database'
import { AutorizacaoMiddleware } from '../middlewares/autorizacao-middleware'

const router = Router()
const database = new PrismaDatabase();

const discenteRepository = new DiscenteRepository(database)
const discenteService = new DiscenteService(discenteRepository)
const discenteController = new DiscenteController(discenteService)
const middlewareAutorizacao = new AutorizacaoMiddleware()

router.post('/create', middlewareAutorizacao.autorizarApenas('ADMIN'), discenteController.criaDiscente.bind(discenteController))
router.post('/update/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), discenteController.atualizaDiscente.bind(discenteController))
router.delete('/delete/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), discenteController.deletaDiscente.bind(discenteController));

export { router as discenteRoutes }
