import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import { AlunoService } from "../services/aluno-service";
import { DisciplinaService } from "../services/disciplina-service";
import { SistemaService } from "../services/sistema-service";
import { ReportarErrorAoSistema } from "../exceptions/ReportarErroAoSistema";

export class SistemaController {
  private userService: UserService
  private alunoService: AlunoService
  private disciplinaService: DisciplinaService
  private sistemaService: SistemaService

  constructor(userService: UserService, alunoService: AlunoService, disciplinaService: DisciplinaService, sistemaService: any) {
    this.userService = userService,
    this.alunoService = alunoService
    this.disciplinaService = disciplinaService
    this.sistemaService = sistemaService
  }

  public async autenticaAluno(req: Request, res: Response): Promise<void> {
    const { matricula, password, vinculo } = req.body

    try {
      const instituicao = this.sistemaService.lidaComIdentificacaoDaInstituicaoDeEnsino(vinculo)
      const token = await this.sistemaService.buscaTokenDoUsuarioNaRPE(matricula, password, instituicao)
      const dadosAluno = await this.sistemaService.importaDadosDoAluno(matricula, password, token, instituicao)
      const user = await this.userService.lidaComCriacaoDoUsuario({ nome: dadosAluno.nome, role: 'ALUNO' })
      await this.alunoService.lidaComCriacaoDoAluno({ ...dadosAluno, userId: user!.id })

      res.status(200).json({
        message: 'Autenticado com sucesso!',
        data: { ...dadosAluno }
      })
    } catch (error) {
      if (error instanceof ReportarErrorAoSistema) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
      }
    }
  }

}
