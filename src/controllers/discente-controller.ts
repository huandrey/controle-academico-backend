import { Request, Response } from 'express'
import { DiscenteDTO } from '../dtos/discente-dto'
import { IDiscenteService } from '../services/discente-service'
import { ReportarErrorAoSistema } from '../exceptions/ReportarErroAoSistema'

export class DiscenteController {
  private discenteService: IDiscenteService

  constructor(discenteService: IDiscenteService) {
    this.discenteService = discenteService
  }

  public async criaDiscente(req: Request, res: Response): Promise<void> {
    const discente: DiscenteDTO = req.body

    try {
      await this.discenteService.lidaComCriacaoDoDiscente(discente)
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

  public async buscaDiscentePorId(req: Request, res: Response): Promise<void> {
    const discenteId = parseInt(req.params.id, 10)

    try {
      const student = await this.discenteService.lidaComBuscaDoDiscentePorId(discenteId)
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

  public async buscaDiscentePorMatricula(req: Request, res: Response): Promise<void> {
    const matricula = req.body.matricula

    try {
      const student = await this.discenteService.lidaComBuscaDoDiscentePorMatricula(matricula)
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

  public async atualizaDiscente(req: Request, res: Response): Promise<void> {
    const discenteId = parseInt(req.params.id, 10)
    const discente: DiscenteDTO = req.body

    try {
      const updatedStudent = await this.discenteService.lidaComAtualizacaoDoDiscente(discenteId, discente)
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

  public async deletaDiscente(req: Request, res: Response): Promise<void> {
    const discenteId = parseInt(req.params.id, 10)

    try {
      await this.discenteService.lidaComRemocaoDoDiscente(discenteId)
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
