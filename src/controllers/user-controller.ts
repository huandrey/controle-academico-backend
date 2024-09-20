import { Request, Response } from 'express'
import { UserDTO } from "../dtos/user-dto"
import { IUserService } from '../services/user-service'
import { ReportarErrorAoSistema } from '../exceptions/ReportarErroAoSistema'

export interface CriaUsuarioRequest extends Request {
  body: UserDTO
}

export interface AtualizaUsuarioRequest extends Request {
  body: UserDTO
}

export class UserController {
  private userService: IUserService

  constructor(userService: IUserService) {
    this.userService = userService
  }

  public async criaUsuario(req: CriaUsuarioRequest, res: Response): Promise<void> {
    try {
      const { nome, role } = req.body
      const user = await this.userService.lidaComCriacaoDoUsuario({ nome, role })
      res.status(201).json(user)
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
      const userId = parseInt(req.params.id, 10)
      console.log(userId)
      const updates = req.body

      const updatedUser = await this.userService.lidaComAtualizacaoDoUsuario(userId, updates)
      
      if (updatedUser) {
        res.status(200).json(updatedUser)
      } else {
        res.status(404).json({ error: 'User not found' })
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
      const userId = parseInt(req.params.id, 10)
      await this.userService.lidaComRemocaoDoUsuario(userId)
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
      const userId = parseInt(req.params.id, 10)
      const usuarioEncontrado = await this.userService.lidaComBuscaDoUsuarioPorId(userId)
      
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
      const usuariosEncontrados = await this.userService.lidaComBuscaDosUsuarios()
      
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
