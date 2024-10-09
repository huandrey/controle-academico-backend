import { Router } from 'express'
import { UsuarioService } from './usuario-service'
import { UsuarioRepository } from './usuario-repository'
import { UsuarioController } from './usuario-controller'
import { PrismaDatabase } from '../../shared/database/prisma-database'
import { AutorizacaoMiddleware } from '../../shared/middlewares/autorizacao-middleware'

const router = Router()
const database = new PrismaDatabase();

const usuarioRepository = new UsuarioRepository(database)
const middlewareAutorizacao = new AutorizacaoMiddleware()
const usuarioService = new UsuarioService(usuarioRepository)
const usuarioController = new UsuarioController(usuarioService)

router.get('', middlewareAutorizacao.autorizarApenas('ADMIN'), usuarioController.buscaUsuarios.bind(usuarioController))
router.get('/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), usuarioController.buscaUsuario.bind(usuarioController))
router.post('/create', usuarioController.criaUsuario.bind(usuarioController))
router.put('/update/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), usuarioController.atualizaUsuario.bind(usuarioController))
router.delete('/delete/:id', middlewareAutorizacao.autorizarApenas('ADMIN'), usuarioController.deletaUsuario.bind(usuarioController))

export { router as usuarioRoutes }
