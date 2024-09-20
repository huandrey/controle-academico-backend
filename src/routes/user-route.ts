import { UserRepository } from './../repositories/user-repository'
import { Router } from 'express'
import { UserController } from '../controllers/user-controller'
import { UserService } from '../services/user-service'
import { PrismaDatabase } from '../database/prisma-database'
import { AutorizacaoMiddleware } from '../middlewares/autorizacao-middleware'

const router = Router()
const database = new PrismaDatabase();

const userRepository = new UserRepository(database)
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const middlewareAutorizacao = new AutorizacaoMiddleware()

router.get('', userController.buscaUsuarios.bind(userController))
router.post('/create', userController.criaUsuario.bind(userController))
router.put('/update/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), userController.atualizaUsuario.bind(userController))
router.delete('/delete/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), userController.deletaUsuario.bind(userController));

export { router as userRoutes }
