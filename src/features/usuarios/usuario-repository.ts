import { Usuario } from "@prisma/client"
import { IDatabase } from "../../shared/database/database-interface"
import { UsuarioDTO } from "./usuario-dto"

export interface IUsuarioRepository {
  criaUsuario(usuarioDTO: UsuarioDTO): Promise<number>
  atualizaUsuario(id: number, data: Partial<UsuarioDTO>): Promise<Usuario | null>
  deletaUsuario(id: number): Promise<void>
  buscaUsuarioPorId(id: number): Promise<Usuario | null>
  buscaPorTodosUsuarios(): Promise<Usuario[] | null>
}

export class UsuarioRepository implements IUsuarioRepository {
  private orm: IDatabase

  constructor(orm: IDatabase) {
    this.orm = orm
  }

  async criaUsuario(data: UsuarioDTO): Promise<number> {
    const usuario = await this.orm.salvaUsuario(data)
    return usuario.id
  }

  async atualizaUsuario(id: number, data: UsuarioDTO): Promise<Usuario | null> {
    return this.orm.atualizaUsuario(id, data)
  }

  buscaUsuarioPorId(id: number): Promise<Usuario | null> {
    return this.orm.buscaUsuarioPorId(id)
  }

  async buscaPorTodosUsuarios(): Promise<Usuario[] | null> {
    return this.orm.buscaPorTodosUsuarios()
  }

  async deletaUsuario(id: number): Promise<void> {
    await this.orm.removeUsuario(id)
  }
}
