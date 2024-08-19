import { DiscenteRepository } from './../repositories/discente-repository'
import { Router } from 'express'
import { DiscenteController } from '../controllers/discente-controller'
import { DiscenteService } from '../services/discente-service'
import { PrismaDatabase } from '../database/prisma-database'

const router = Router()
const database = new PrismaDatabase();

const discenteRepository = new DiscenteRepository(database)
const discenteService = new DiscenteService(discenteRepository)
const discenteController = new DiscenteController(discenteService)

router.post('create', discenteController.criaDiscente.bind(discenteController))
router.post('update', discenteController.atualizaDiscente.bind(discenteController))
router.delete('delete', discenteController.deletaDiscente.bind(discenteController));

export { router as discenteRoutes }
