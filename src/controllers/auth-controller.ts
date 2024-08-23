import { Request, Response } from "express"
import { AuthService } from "../services/auth-service"
import { ReportarErrorAoSistema } from "../exceptions/ReportarErroAoSistema"

export class AuthController {
  private authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
  }

  async gerarToken(req: Request, res: Response) {
    const { id, role } = req.body

    try {
      const token = await this.authService.lidaComGeracaoDoToken({ id, role })
      
      return res.status(201).json({ 
        message: "Token gerado com sucesso.",
        data: token 
      })
    } catch (error) {
      if (error instanceof ReportarErrorAoSistema) {
        return res.status(400).json({ 
          error: error.message,
          details: process.env.NODE_ENV === 'development' ? error.stack : ""
       })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }
}
