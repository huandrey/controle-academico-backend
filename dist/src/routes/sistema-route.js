import { Router } from 'express';
import { PrismaDatabase } from '../database/prisma-database';
import { SistemaController } from '../controllers/sistema-controller';
import { AlunoService } from '../services/aluno-service';
import { AlunoRepository } from '../repositories/aluno-repository';
import { DisciplinaRepository } from '../repositories/disciplina-repository';
import { UserRepository } from '../repositories/user-repository';
import { DisciplinaService } from '../services/disciplina-service';
import { UserService } from '../services/user-service';
import { SistemaService } from '../services/sistema-service';
const router = Router();
const database = new PrismaDatabase();
const discenteRepository = new AlunoRepository(database);
const disciplinaRepository = new DisciplinaRepository(database);
const userRepository = new UserRepository(database);
const userService = new UserService(userRepository);
const discenteService = new AlunoService(discenteRepository);
const disciplinaService = new DisciplinaService(disciplinaRepository);
const sistemaService = new SistemaService();
const sistemaController = new SistemaController(userService, discenteService, disciplinaService, sistemaService);
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
export { router as sistemaRoutes };
