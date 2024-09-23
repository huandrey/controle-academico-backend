import { User } from "@prisma/client"
import { IDatabase } from "../database/database-interface"
import { UserDTO } from "../dtos/user-dto"

export interface IUserRepository {
  criaUsuario(data: UserDTO): Promise<User>
  buscaUsuarios(): Promise<User[] | null>
  buscaUsuarioPorId(id: number): Promise<User | null> 
  atualizaUsuario(id: number, data: Partial<UserDTO>): Promise<User | null>
  deletaUsuario(id: number): Promise<void>
}

export type UpdateUserDTO = {
  email?: string
  name?: string
  password?: string
  role?: string
}

export class UserRepository implements IUserRepository {
  private orm: IDatabase

  constructor(orm: IDatabase) {
    this.orm = orm
  }
  buscaUsuarioPorId(id: number): Promise<User | null> {
    throw new Error("Method not implemented.")
  }
  async criaUsuario(data: UserDTO): Promise<User> {
    const user = await this.orm.criaUsuario(data)
    return {
      id: user.id,
      token: '',
      nome: user.nome,
      role: user.role,
      createdAt: user.createdAt
    }
  }

  async atualizaUsuario(id: number, data: UserDTO): Promise<User | null> {
    return this.orm.atualizaUsuario(id, data)
  }

  async deletaUsuario(id: number): Promise<void> {
    await this.orm.deletaUsuario(id)
  }

  async findUserById(id: number): Promise<User | null> {
    return this.orm.buscaUsuarioPorId(id)
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.orm.buscaUsuarioPorEmail(email)
  }

  async buscaUsuarios(): Promise<User[] | null> {
    return this.orm.buscaPorUsuarios()
  }
}
