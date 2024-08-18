import { DisciplinaRepository } from './../repositories/disciplina-repository'
import { Router } from 'express'
import { DisciplinaService } from '../services/disciplina-service'
import { PrismaDatabase } from '../database/prisma-database'
import { DisciplinaController } from '../controllers/disciplina-controller'

const router = Router()
const database = new PrismaDatabase();

const disciplinaRepository = new DisciplinaRepository(database)
const disciplinaService = new DisciplinaService(disciplinaRepository)
const disciplinaController = new DisciplinaController(disciplinaService)

router.post('create', disciplinaController.criaDisciplina.bind(disciplinaController))
router.post('update', disciplinaController.atualizaDisciplina.bind(disciplinaController))
router.delete('delete', disciplinaController.deletaDisciplina.bind(disciplinaController));

export { router as disciplinaRoutes }
