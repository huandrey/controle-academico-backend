import { AlunoDTO } from './aluno-dto'
import { Request, Response } from 'express'
import { IAlunoService } from './aluno-service'
import { IUsuarioService } from '../usuarios/usuario-service'
import { ReportarErrorAoSistema } from '../../shared/exceptions/ReportarErroAoSistema'

export class AlunoController {
  private usuarioService: IUsuarioService
  private alunoService: IAlunoService

  constructor(usuarioService: IUsuarioService, alunoService: IAlunoService) {
    this.alunoService = alunoService
    this.usuarioService = usuarioService
  }

  public async criaAluno(req: Request, res: Response): Promise<void> {
    const aluno: AlunoDTO = req.body

    try {
      const usuarioId = await this.usuarioService.lidaComCriacaoDoUsuario(aluno)
      await this.alunoService.lidaComCriacaoDoAluno({ ...aluno, usuarioId })
      res.status(201).json({ message: "Aluno criado com sucesso!" })
    } catch (error) {
      if (error instanceof ReportarErrorAoSistema) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  public async buscaAlunoPorId(req: Request, res: Response): Promise<void> {
    const alunoId = parseInt(req.params.id, 10)

    try {
      const student = await this.alunoService.lidaComBuscaDoAlunoPorId(alunoId)
      if (student) {
        res.status(200).json(student)
      } else {
        res.status(404).json({ error: 'Aluno não encontrado' })
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

  public async buscaAlunoPorMatricula(req: Request, res: Response): Promise<void> {
    const matricula = req.body.matricula

    try {
      const student = await this.alunoService.lidaComBuscaDoAlunoPorMatricula(matricula)
      if (student) {
        res.status(200).json(student)
      } else {
        res.status(404).json({ error: 'Aluno não encontrado' })
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

  public async atualizaAluno(req: Request, res: Response): Promise<void> {
    const alunoId = parseInt(req.params.id, 10)
    const aluno: AlunoDTO = req.body

    try {
      const updatedStudent = await this.alunoService.lidaComAtualizacaoDoAluno(alunoId, aluno)
      if (updatedStudent) {
        res.status(200).json(updatedStudent)
      } else {
        res.status(404).json({ error: 'Aluno não encontrado' })
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

  public async deletaAluno(req: Request, res: Response): Promise<void> {
    const alunoId = parseInt(req.params.id, 10)

    try {
      await this.alunoService.lidaComRemocaoDoAluno(alunoId)
      res.status(204).send()
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
