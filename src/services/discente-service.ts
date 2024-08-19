import {  IDiscenteRepository } from '../repositories/discente-repository'
import { DiscenteDTO } from '../dtos/discente-dto'
import { Discente } from '@prisma/client'

export interface IDiscenteService {
  lidaComCriacaoDoDiscente(data: DiscenteDTO): Promise<Discente | null>
  lidaComAtualizacaoDoDiscente(id: number, data: Partial<DiscenteDTO>): Promise<Discente | null>
  lidaComRemocaoDoDiscente(id: number): Promise<void>
  lidaComBuscaDoDiscentePorId(id: number): Promise<Discente | null>
}
export class DiscenteService implements IDiscenteService {
  private discenteRepository: IDiscenteRepository

  constructor(discenteRepository: IDiscenteRepository) {
    this.discenteRepository = discenteRepository
  }

  async lidaComCriacaoDoDiscente(data: DiscenteDTO) {
    try {
      const discente = await this.discenteRepository.criaDiscente(data)
      return discente
    } catch (error) {
      throw new Error('Error creating discente')
    }
  }

  async lidaComBuscaDoDiscentePorId(id: number) {
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
  async lidaComAtualizacaoDoDiscente(id: number, data: Partial<DiscenteDTO>) {
    try {
      const discenteAtualizado = await this.discenteRepository.atualizaDiscente(id, data)
      return discenteAtualizado
    } catch (error) {
      throw new Error('Error updating discente')
    }
  }
  
  async lidaComRemocaoDoDiscente(id: number) {
    try {
      await this.discenteRepository.deletaDiscente(id)
    } catch (error) {
      throw new Error('Error deleting discente')
    }
  }
}
