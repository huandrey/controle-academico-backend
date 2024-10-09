import { Router } from 'express'
import { PrismaDatabase } from '../../shared/database/prisma-database'
import { SessaoController } from './sessao-controller';
import { AlunoService } from '../../features/alunos/aluno-service';
import { AlunoRepository } from '../../features/alunos/aluno-repository';
import { DisciplinaRepository } from '../../features/disciplinas/disciplina-repository';
import { UsuarioRepository } from '../../features/usuarios/usuario-repository';
import { DisciplinaService } from '../../features/disciplinas/disciplina-service';
import { UsuarioService } from '../../features/usuarios/usuario-service';
import { AutorizacaoMiddleware } from '../../shared/middlewares/autorizacao-middleware';
import { SessaoService } from './sessao-service';

const router = Router()
const database = new PrismaDatabase();

const alunoRepository = new AlunoRepository(database)
const disciplinaRepository = new DisciplinaRepository(database)
const usuarioRepository = new UsuarioRepository(database)

const usuarioService = new UsuarioService(usuarioRepository)
const alunoService = new AlunoService(alunoRepository)
const disciplinaService = new DisciplinaService(disciplinaRepository)
const sessaoService = new SessaoService()

const sessaoController = new SessaoController(
  usuarioService,
  alunoService,
  disciplinaService,
  sessaoService,
)

router.post('/iniciar-sessao', sessaoController.criaConexaoComSessao.bind(sessaoController))

export { router as sessaoRoutes }
