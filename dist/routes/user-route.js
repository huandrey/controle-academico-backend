"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_repository_1 = require("./../repositories/user-repository");
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const user_service_1 = require("../services/user-service");
const prisma_database_1 = require("../database/prisma-database");
const autorizacao_middleware_1 = require("../middlewares/autorizacao-middleware");
const router = (0, express_1.Router)();
exports.userRoutes = router;
const database = new prisma_database_1.PrismaDatabase();
const userRepository = new user_repository_1.UserRepository(database);
const userService = new user_service_1.UserService(userRepository);
const userController = new user_controller_1.UserController(userService);
const middlewareAutorizacao = new autorizacao_middleware_1.AutorizacaoMiddleware();
router.get('', userController.buscaUsuarios.bind(userController));
router.post('/create', userController.criaUsuario.bind(userController));
router.put('/update/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), userController.atualizaUsuario.bind(userController));
router.delete('/delete/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), userController.deletaUsuario.bind(userController));