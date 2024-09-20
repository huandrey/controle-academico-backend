import {  IAlunoRepository } from '../repositories/aluno-repository'
import { AlunoDTO } from '../dtos/aluno-dto'
import { Aluno } from '@prisma/client'
import { ReportarErrorAoSistema } from '../exceptions/ReportarErroAoSistema'

export interface IAlunoService {
  lidaComCriacaoDoAluno(data: AlunoDTO): Promise<Aluno | null>
  lidaComAtualizacaoDoAluno(id: number, data: Partial<AlunoDTO>): Promise<Aluno | null>
  lidaComRemocaoDoAluno(id: number): Promise<void>
  lidaComBuscaDoAlunoPorId(id: number): Promise<Aluno | null>
  lidaComBuscaDoAlunoPorMatricula(matricula: string): Promise<Aluno | null>
}
export class AlunoService implements IAlunoService {
  private alunoRepository: IAlunoRepository

  constructor(alunoRepository: IAlunoRepository) {
    this.alunoRepository = alunoRepository
  }

  async lidaComCriacaoDoAluno(data: AlunoDTO) {
    if (!data.nome || !data.matricula || !data.cursoId || !data.userId) {
      throw new ReportarErrorAoSistema('Dados insuficientes para criar o usuário.')
    }

    try {
      data.cursoId = Number(data.cursoId)
      data.userId = Number(data.userId)
      
      const aluno = await this.alunoRepository.criaAluno(data)
      return aluno
    } catch (error) {
      console.log(error)
      throw new Error('Error creating aluno')
    }
  }

  async lidaComBuscaDoAlunoPorId(id: number) {
    if (!id) {
      throw new ReportarErrorAoSistema('ID do usuário não informado.')
    }
    try {
      const aluno = await this.alunoRepository.buscaAlunoPorId(id)
      if (!aluno) {
        throw new Error('User not found')
      }
      return aluno
    } catch (error) {
      throw new Error('Error fetching aluno')
    }
  }
  
  async lidaComBuscaDoAlunoPorMatricula(matricula: string): Promise<Aluno | null> {
    if (!matricula) {
      throw new ReportarErrorAoSistema('Matricula do usuário não informada.')
    }
    try {
      const aluno = await this.alunoRepository.buscaAlunoPorMatricula(matricula)

      return aluno
    } catch (error) {
      throw new Error('Error fetching aluno')
    }
  }

  async lidaComAtualizacaoDoAluno(id: number, data: Partial<AlunoDTO>) {
    if (!id) {
      throw new ReportarErrorAoSistema('ID do usuário não informado.')
    }

    if (!data.nome || !data.matricula || !data.cursoId || !data.userId) {
      throw new ReportarErrorAoSistema('Dados insuficientes para atualizar o usuário.')
    }

    try {
      const alunoAtualizado = await this.alunoRepository.atualizaAluno(id, data)
      return alunoAtualizado
    } catch (error) {
      throw new Error('Error updating aluno')
    }
  }
  
  async lidaComRemocaoDoAluno(id: number) {
    if (!id) {
      throw new ReportarErrorAoSistema('ID do usuário não informado.')
    }
    try {
      await this.alunoRepository.deletaAluno(id)
    } catch (error) {
      throw new Error('Error deleting aluno')
    }
  }
}
