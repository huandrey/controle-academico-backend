import { IUserRepository } from'../repositories/user-repository'
import { UserDTO } from '../dtos/user-dto'
import { User } from '@prisma/client'
import { ReportarErrorAoSistema } from '../exceptions/ReportarErroAoSistema'

export interface IUserService {
  lidaComCriacaoDoUsuario(data: UserDTO): Promise<User | null>
  lidaComBuscaDoUsuarioPorId(id: number): Promise<User | null>
  lidaComAtualizacaoDoUsuario(id: number, data: Partial<UserDTO>): Promise<User | null>
  lidaComRemocaoDoUsuario(id: number): Promise<void>
  lidaComBuscaDosUsuarios(): Promise<User[] | null>
}
export class UserService implements IUserService {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async lidaComCriacaoDoUsuario({ nome, role }: UserDTO): Promise<User | null> {
    try {
      if (!nome || typeof nome !== 'string') {
        throw new ReportarErrorAoSistema('Nome é obrigatório e precisa ser uma string.')
      }
      if (!role || !['ADMIN', 'ALUNO', 'DOCENTE'].includes(role)) {
        throw new ReportarErrorAoSistema('Uma role é obrigatória. Veja a documentação')
      }

      const user = await this.userRepository.criaUsuario({ nome, role })
      return user
    } catch (error) {
      throw error
    }
  }

  async lidaComBuscaDoUsuarioPorId(id: number) {
    try {
      const user = await this.userRepository.buscaUsuarioPorId(id)
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (error) {
      throw new Error('Erro ao buscar usuário')
    }
  }
  async lidaComAtualizacaoDoUsuario(id: number, data: Partial<UserDTO>) {
    if (!data.nome || !data.role) {
      throw new ReportarErrorAoSistema('Nome e role são obrigatórios')
    }
    try {
      const updatedUser = await this.userRepository.atualizaUsuario(id, data)
      return updatedUser
    } catch (error) {
      throw new Error('Erro ao atualizar o usuário')
    }
  }
  
  async lidaComRemocaoDoUsuario(id: number) {
    try {
      await this.userRepository.deletaUsuario(id)
    } catch (error) {
      throw new Error('Error deleting user')
    }
  }

  async lidaComBuscaDosUsuarios() {
    try {
      const users = await this.userRepository.buscaUsuarios()
      
      if (!users) {
        return []
      }
      
      return users
    } catch (error) {
      throw new Error('Error fetching user')
    }
  }
}
