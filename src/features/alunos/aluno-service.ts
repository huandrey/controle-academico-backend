import { IAlunoRepository } from './aluno-repository'
import { AlunoDTO } from './aluno-dto'
import { Aluno } from '@prisma/client'
import { ReportarErrorAoSistema } from '../../shared/exceptions/ReportarErroAoSistema'

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
    if (!data.nome || !data.matricula || !data.usuarioId) {
      throw new ReportarErrorAoSistema('Dados insuficientes para criar aluno. Veja a documentação: Nome e matrícula são obrigatórios. Além disso, um usuário precisa ser criado para que seu id seja vinculado a entidade aluno.')
    }

    try {
      data.usuarioId = Number(data.usuarioId)

      const aluno = await this.alunoRepository.salvaAluno(data)
      return aluno
    } catch (error) {
      console.error(error)
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

    if (!data.nome || !data.matricula || !data.usuarioId) {
      throw new ReportarErrorAoSistema('Dados insuficientes para criar aluno. Veja a documentação: Nome e matrícula são obrigatórios. Além disso, um usuário precisa ser criado para que seu id seja vinculado a entidade aluno.')
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
      await this.alunoRepository.removeAluno(id)
    } catch (error) {
      throw new Error('Error deleting aluno')
    }
  }
}
