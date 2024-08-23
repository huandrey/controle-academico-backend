import { Router } from 'express'
import { PrismaDatabase } from '../database/prisma-database'
import { SistemaController } from '../controllers/sistema-controller';
import { DiscenteController } from '../controllers/discente-controller';
import { DisciplinaController } from '../controllers/disciplina-controller';
import { DiscenteService } from '../services/discente-service';
import { DiscenteRepository } from '../repositories/discente-repository';
import { DisciplinaRepository } from '../repositories/disciplina-repository';
import { UserRepository } from '../repositories/user-repository';
import { DisciplinaService } from '../services/disciplina-service';
import { UserController } from '../controllers/user-controller';
import { UserService } from '../services/user-service';
import { AutorizacaoMiddleware } from '../middlewares/autorizacao-middleware';

const router = Router()
const database = new PrismaDatabase();

const discenteRepository = new DiscenteRepository(database)
const disciplinaRepository = new DisciplinaRepository(database)
const userRepository = new UserRepository(database)

const userService = new UserService(userRepository)
const discenteService = new DiscenteService(discenteRepository)
const disciplinaService = new DisciplinaService(disciplinaRepository)

const sistemaController = new SistemaController(
  new UserController(userService),
  new DiscenteController(discenteService),
  new DisciplinaController(disciplinaService),
)

const middlewareAutorizacao = new AutorizacaoMiddleware(discenteService)

router.post('/session', middlewareAutorizacao.verificaSeAlunoJaExisteNoSistema, sistemaController.criaConexaoComSistema.bind(sistemaController))

export { router as sistemaRoutes }
