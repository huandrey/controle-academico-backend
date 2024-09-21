"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sistemaRoutes = void 0;
const express_1 = require("express");
const prisma_database_1 = require("../database/prisma-database");
const sistema_controller_1 = require("../controllers/sistema-controller");
const aluno_service_1 = require("../services/aluno-service");
const aluno_repository_1 = require("../repositories/aluno-repository");
const disciplina_repository_1 = require("../repositories/disciplina-repository");
const user_repository_1 = require("../repositories/user-repository");
const disciplina_service_1 = require("../services/disciplina-service");
const user_service_1 = require("../services/user-service");
const sistema_service_1 = require("../services/sistema-service");
const router = (0, express_1.Router)();
exports.sistemaRoutes = router;
const database = new prisma_database_1.PrismaDatabase();
const discenteRepository = new aluno_repository_1.AlunoRepository(database);
const disciplinaRepository = new disciplina_repository_1.DisciplinaRepository(database);
const userRepository = new user_repository_1.UserRepository(database);
const userService = new user_service_1.UserService(userRepository);
const discenteService = new aluno_service_1.AlunoService(discenteRepository);
const disciplinaService = new disciplina_service_1.DisciplinaService(disciplinaRepository);
const sistemaService = new sistema_service_1.SistemaService();
const sistemaController = new sistema_controller_1.SistemaController(userService, discenteService, disciplinaService, sistemaService);
// Onde eu encaixo o eureca aqui? Middleware? Helpers handles? 
/*
Cliente inicia sessão -> servidor recebe ->
      identifica qual universidade ->
            se for ufcg -> faz request para a api do eureca -> recebendo a resposta ->
            trata dado recebido ->
                  salva dados? -> // se sim, salva no banco de dados
                    retorna para o cliente
*/
router.post('/session', sistemaController.autenticaAluno.bind(sistemaController));
