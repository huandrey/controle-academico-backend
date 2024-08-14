import { UserRepository } from './../repositories/user-repository';
import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { UserService } from '../services/user-service';

const router = Router();

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

router.post('/import', userController.importUserData.bind(userController));

export { router as userRoutes };
