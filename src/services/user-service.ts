import { IUserRepository } from'../repositories/user-repository'
import { UserDTO } from '../dtos/user-dto'
import { User } from '@prisma/client'

export interface IUserService {
  lidaComCriacaoDoUsuario(data: UserDTO): Promise<User>
  lidaComBuscaDoUsuarioPorId(id: number): Promise<User | null>
  lidaComAtualizacaoDoUsuario(id: number, data: Partial<UserDTO>): Promise<User | null>
  lidaComRemocaoDoUsuario(id: number): Promise<void>
}
export class UserService implements IUserService {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async lidaComCriacaoDoUsuario({ nome, role }: UserDTO) {
    try {
      if (!nome || typeof nome !== 'string') {
        throw new ErroEncontradoNaCamadaDeServico('Nome é obrigatório e precisa ser uma string.')
      }
      if (!role || !['admin', 'discente', 'docente'].includes(role)) {
        throw new ErroEncontradoNaCamadaDeServico('Uma role é obrigatória. Veja a documentação')
      }

      const user = await this.userRepository.criaUsuario({ nome, role })
      return user
    } catch (error) {
      throw new Error('Error creating user')
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
      throw new Error('Error fetching user')
    }
  }
  async lidaComAtualizacaoDoUsuario(id: number, data: Partial<UserDTO>) {
    try {
      const updatedUser = await this.userRepository.atualizaUsuario(id, data)
      return updatedUser
    } catch (error) {
      throw new Error('Error updating user')
    }
  }
  
  async lidaComRemocaoDoUsuario(id: number) {
    try {
      await this.userRepository.deletaUsuario(id)
    } catch (error) {
      throw new Error('Error deleting user')
    }
  }
}

  
