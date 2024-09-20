import { Router } from 'express'
import { PrismaDatabase } from '../database/prisma-database'
import { SistemaController } from '../controllers/sistema-controller';
import { DiscenteService } from '../services/discente-service';
import { DiscenteRepository } from '../repositories/discente-repository';
import { DisciplinaRepository } from '../repositories/disciplina-repository';
import { UserRepository } from '../repositories/user-repository';
import { DisciplinaService } from '../services/disciplina-service';
import { UserService } from '../services/user-service';
import { AutorizacaoMiddleware } from '../middlewares/autorizacao-middleware';
import { SistemaService } from '../services/sistema-service';

const router = Router()
const database = new PrismaDatabase();

const discenteRepository = new DiscenteRepository(database)
const disciplinaRepository = new DisciplinaRepository(database)
const userRepository = new UserRepository(database)

const userService = new UserService(userRepository)
const discenteService = new DiscenteService(discenteRepository)
const disciplinaService = new DisciplinaService(disciplinaRepository)
const sistemaService = new SistemaService()

const sistemaController = new SistemaController(
  userService,
  discenteService,
  disciplinaService,
  sistemaService,
)

router.post('/session', sistemaController.criaConexaoComSistema.bind(sistemaController))

export { router as sistemaRoutes }
