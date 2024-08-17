import { PrismaClient } from '@prisma/client'
import { DiscenteRepository, IDiscenteRepository } from '../repositories/discente-repository'
import { DiscenteDTO } from '../dtos/discente-dto'
import { PrismaDatabase } from '../database/prisma-database'

export class DiscenteService {
  private discenteRepository: IDiscenteRepository

  constructor() {
    this.discenteRepository = new DiscenteRepository(new PrismaDatabase())
  }

  async lidaComCriacaoDoUsuario(data: DiscenteDTO) {
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
  async lidaComAtualizacaoDoUsuario(id: number, data: Partial<DiscenteDTO>) {
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
