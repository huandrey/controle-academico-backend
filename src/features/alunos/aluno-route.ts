import { AlunoRepository } from './aluno-repository'
import { Router } from 'express'
import { AlunoController } from './aluno-controller'
import { AlunoService } from './aluno-service'
import { PrismaDatabase } from '../../shared/database/prisma-database'
import { AutorizacaoMiddleware } from '../../shared/middlewares/autorizacao-middleware'
import { UsuarioRepository } from '../usuarios/usuario-repository'
import { UsuarioService } from '../usuarios/usuario-service'

const router = Router()
const database = new PrismaDatabase();

const alunoRepository = new AlunoRepository(database)
const usuarioRepository = new UsuarioRepository(database)
const alunoService = new AlunoService(alunoRepository)
const usuarioService = new UsuarioService(usuarioRepository)
const alunoController = new AlunoController(usuarioService, alunoService)
const middlewareAutorizacao = new AutorizacaoMiddleware()

router.get('/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), alunoController.buscaAlunoPorId.bind(alunoController))
router.post('/create', middlewareAutorizacao.autorizarApenas('ADMIN'), alunoController.criaAluno.bind(alunoController))
router.post('/update', middlewareAutorizacao.autorizarApenas('ADMIN'), alunoController.atualizaAluno.bind(alunoController))
router.delete('/delete', middlewareAutorizacao.autorizarApenas('ADMIN'), alunoController.deletaAluno.bind(alunoController));

export { router as alunoRoutes }
