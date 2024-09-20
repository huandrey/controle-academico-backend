import { Request, Response } from "express";
import { PayloadUserAlreadyExists } from "../middlewares/autorizacao-middleware";
import { UserService } from "../services/user-service";
import { AlunoService } from "../services/aluno-service";
import { DisciplinaService } from "../services/disciplina-service";
import { SessionDTO } from "../dtos/session-dto";
import { SistemaService } from "../services/sistema-service";
import { ReportarErrorAoSistema } from "../exceptions/ReportarErroAoSistema";

export class SistemaController {
  private userService: UserService
  private alunoService: AlunoService
  private disciplinaService: DisciplinaService
  private sistemaService

  constructor(userService: UserService, alunoService: AlunoService, disciplinaService: DisciplinaService, sistemaService: any) {
    this.userService = userService,
    this.alunoService = alunoService
    this.disciplinaService = disciplinaService
    this.sistemaService = sistemaService
  }

  public async autenticaAluno(req: Request, res: Response): Promise<void> {
    const { matricula, password } = req.body

    try {
      const user = await this.sistemaService.lidaComAutenticacaoDoUsuario()

      if (user) {
        res.status(200).json({
          message: 'Autenticado com sucesso!',
          data: user
        })
      } else {
        res.status(401).json({ error: 'Usuário ou senha inválidos' })
      }
    } catch (error) {
      if (error instanceof ReportarErrorAoSistema) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
      }
    }
  }

}
