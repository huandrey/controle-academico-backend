import { UserRepository } from './../repositories/user-repository'
import { Router } from 'express'
import { UserController } from '../controllers/user-controller'
import { UserService } from '../services/user-service'
import { PrismaDatabase } from '../database/prisma-database'

const router = Router()
const database = new PrismaDatabase();

const userRepository = new UserRepository(database)
const userService = new UserService(userRepository)
const userController = new UserController(userService)

router.post('create', userController.criaUsuario.bind(userController))
// router.post('/import', userController.importUserData.bind(userController))

export { router as userRoutes }
