import { Request, Response } from 'express'
import { StudentDTO } from '../dtos/student-dto'
import { DiscenteService } from '../services/discente-service'
import { DiscenteDTO } from '../dtos/discente-dto'

export class DiscenteController {
  private discenteService: DiscenteService

  constructor() {
    this.discenteService = new DiscenteService()
  }

  public async criaDiscente(req: Request, res: Response): Promise<void> {
    const discente: DiscenteDTO = req.body

    try {
      await this.discenteService.lidaComCriacaoDoUsuario(discente)
      res.status(201).json({ message: "Aluno criado com sucesso!" })
    } catch (error) {
      if (error instanceof ErroEncontradoNaCamadaDeServico) {
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
      if (error instanceof ErroEncontradoNaCamadaDeServico) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  public async atualizaDiscente(req: Request, res: Response): Promise<void> {
    const discenteId = parseInt(req.params.id, 10)
    const discente: StudentDTO = req.body

    try {
      const updatedStudent = await this.discenteService.lidaComAtualizacaoDoUsuario(discenteId, discente)
      if (updatedStudent) {
        res.status(200).json(updatedStudent)
      } else {
        res.status(404).json({ error: 'Aluno não encontrado' })
      }
    } catch (error) {
      if (error instanceof ErroEncontradoNaCamadaDeServico) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  public async deleteStudent(req: Request, res: Response): Promise<void> {
    const discenteId = parseInt(req.params.id, 10)

    try {
      await this.discenteService.lidaComRemocaoDoDiscente(discenteId)
      res.status(204).send()
    } catch (error) {
      if (error instanceof ErroEncontradoNaCamadaDeServico) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }
}
