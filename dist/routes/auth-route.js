"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const prisma_database_1 = require("../database/prisma-database");
const auth_controller_1 = require("../controllers/auth-controller");
const auth_service_1 = require("../services/auth-service");
const auth_repository_1 = require("../repositories/auth-repository");
const router = (0, express_1.Router)();
exports.authRoutes = router;
const database = new prisma_database_1.PrismaDatabase();
const authRepository = new auth_repository_1.AuthRepository(database);
const authService = new auth_service_1.AuthService(authRepository);
const authController = new auth_controller_1.AuthController(authService);
router.post('/token/generate', authController.gerarToken.bind(authController));