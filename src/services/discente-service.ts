import {  IDiscenteRepository } from '../repositories/discente-repository'
import { DiscenteDTO } from '../dtos/discente-dto'
import { Discente } from '@prisma/client'
import { ReportarErrorAoSistema } from '../exceptions/ReportarErroAoSistema'

export interface IDiscenteService {
  lidaComCriacaoDoDiscente(data: DiscenteDTO): Promise<Discente | null>
  lidaComAtualizacaoDoDiscente(id: number, data: Partial<DiscenteDTO>): Promise<Discente | null>
  lidaComRemocaoDoDiscente(id: number): Promise<void>
  lidaComBuscaDoDiscentePorId(id: number): Promise<Discente | null>
  lidaComBuscaDoDiscentePorMatricula(matricula: string): Promise<Discente | null>
}
export class DiscenteService implements IDiscenteService {
  private discenteRepository: IDiscenteRepository

  constructor(discenteRepository: IDiscenteRepository) {
    this.discenteRepository = discenteRepository
  }

  async lidaComCriacaoDoDiscente(data: DiscenteDTO) {
    if (!data.nome || !data.matricula || !data.cursoId || !data.userId) {
      throw new ReportarErrorAoSistema('Dados insuficientes para criar o usuário.')
    }

    try {
      data.cursoId = Number(data.cursoId)
      data.userId = Number(data.userId)
      
      const discente = await this.discenteRepository.criaDiscente(data)
      return discente
    } catch (error) {
      console.log(error)
      throw new Error('Error creating discente')
    }
  }

  async lidaComBuscaDoDiscentePorId(id: number) {
    if (!id) {
      throw new ReportarErrorAoSistema('ID do usuário não informado.')
    }
    try {
      const discente = await this.discenteRepository.buscaDiscentePorId(id)
      if (!discente) {
        throw new Error('User not found')
      }
      return discente
    } catch (error) {
      throw new Error('Error fetching discente')
    }
  }
  
  async lidaComBuscaDoDiscentePorMatricula(matricula: string): Promise<Discente | null> {
    if (!matricula) {
      throw new ReportarErrorAoSistema('Matricula do usuário não informada.')
    }
    try {
      const discente = await this.discenteRepository.buscaDiscentePorMatricula(matricula)

      return discente
    } catch (error) {
      throw new Error('Error fetching discente')
    }
  }

  async lidaComAtualizacaoDoDiscente(id: number, data: Partial<DiscenteDTO>) {
    if (!id) {
      throw new ReportarErrorAoSistema('ID do usuário não informado.')
    }

    if (!data.nome || !data.matricula || !data.cursoId || !data.userId) {
      throw new ReportarErrorAoSistema('Dados insuficientes para atualizar o usuário.')
    }

    try {
      const discenteAtualizado = await this.discenteRepository.atualizaDiscente(id, data)
      return discenteAtualizado
    } catch (error) {
      throw new Error('Error updating discente')
    }
  }
  
  async lidaComRemocaoDoDiscente(id: number) {
    if (!id) {
      throw new ReportarErrorAoSistema('ID do usuário não informado.')
    }
    try {
      await this.discenteRepository.deletaDiscente(id)
    } catch (error) {
      throw new Error('Error deleting discente')
    }
  }
}
