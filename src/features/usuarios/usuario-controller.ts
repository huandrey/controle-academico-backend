import { UsuarioDTO } from './usuario-dto'
import { Request, Response } from 'express'
import { IUsuarioService } from './usuario-service'
import { ReportarErrorAoSistema } from '../../shared/exceptions/ReportarErroAoSistema'

export interface CriaUsuarioRequest extends Request {
  body: UsuarioDTO
}

export interface AtualizaUsuarioRequest extends Request {
  body: UsuarioDTO
}

export class UsuarioController {
  private usuarioService: IUsuarioService

  constructor(usuarioService: IUsuarioService) {
    this.usuarioService = usuarioService
  }

  public async criaUsuario(req: CriaUsuarioRequest, res: Response): Promise<void> {
    try {
      const { nome, role } = req.body
      const usuario = await this.usuarioService.lidaComCriacaoDoUsuario({ nome, role })
      res.status(201).json(usuario)
    } catch (error) {
      if (error instanceof ReportarErrorAoSistema) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  public async atualizaUsuario(req: AtualizaUsuarioRequest, res: Response): Promise<void> {
    try {
      const usuarioId: number = parseInt(req.params.id, 10)
      const usuarioDTO: UsuarioDTO = req.body

      const updatedUsuario = await this.usuarioService.lidaComAtualizacaoDoUsuario(usuarioId, usuarioDTO)

      if (updatedUsuario) {
        res.status(200).json(updatedUsuario)
      } else {
        res.status(404).json({ error: 'Usuario not found' })
      }
    } catch (error) {
      if (error instanceof ReportarErrorAoSistema) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  public async deletaUsuario(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = parseInt(req.params.id, 10)
      await this.usuarioService.lidaComRemocaoDoUsuario(usuarioId)
      res.status(204).send() // No Content
    } catch (error) {
      if (error instanceof ReportarErrorAoSistema) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  public async buscaUsuario(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = parseInt(req.params.id, 10)
      const usuarioEncontrado = await this.usuarioService.lidaComBuscaDoUsuarioPorId(usuarioId)

      if (!usuarioEncontrado) {
        res.status(200).json({
          message: 'Usuário não encontrado',
          data: []
        })
      }

      res.status(200).json(usuarioEncontrado)
    } catch (error) {
      if (error instanceof ReportarErrorAoSistema) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  public async buscaUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuariosEncontrados = await this.usuarioService.lidaComBuscaDeTodosUsuariosDoSistema()

      res.status(200).json({
        message: "Usuários encontrados",
        data: usuariosEncontrados
      })
    } catch (error) {
      if (error instanceof ReportarErrorAoSistema) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }
}
