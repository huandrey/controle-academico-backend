import { Router } from 'express'
import { PrismaDatabase } from '../database/prisma-database'
import { AuthController } from '../controllers/auth-controller'
import { AuthService } from '../services/auth-service'
import { AuthRepository } from '../repositories/auth-repository'

const router = Router()
const database = new PrismaDatabase();

const authRepository = new AuthRepository(database)
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

router.post('/token/generate', authController.gerarToken.bind(authController))

export { router as authRoutes }
