import { Request, Response } from 'express'
import { AlunoDTO } from '../dtos/aluno-dto'
import { IAlunoService } from '../services/aluno-service'
import { ReportarErrorAoSistema } from '../exceptions/ReportarErroAoSistema'

export class AlunoController {
  private AlunoService: IAlunoService

  constructor(AlunoService: IAlunoService) {
    this.AlunoService = AlunoService
  }

  public async criaAluno(req: Request, res: Response): Promise<void> {
    const aluno: AlunoDTO = req.body

    try {
      await this.AlunoService.lidaComCriacaoDoAluno(aluno)
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
    const AlunoId = parseInt(req.params.id, 10)

    try {
      const student = await this.AlunoService.lidaComBuscaDoAlunoPorId(AlunoId)
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
      const student = await this.AlunoService.lidaComBuscaDoAlunoPorMatricula(matricula)
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
    const AlunoId = parseInt(req.params.id, 10)
    const Aluno: AlunoDTO = req.body

    try {
      const updatedStudent = await this.AlunoService.lidaComAtualizacaoDoAluno(AlunoId, Aluno)
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
    const AlunoId = parseInt(req.params.id, 10)

    try {
      await this.AlunoService.lidaComRemocaoDoAluno(AlunoId)
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
