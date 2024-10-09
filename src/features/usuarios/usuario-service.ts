import { IUsuarioRepository } from './usuario-repository'
import { UsuarioDTO } from './usuario-dto'
import { Role, Usuario } from '@prisma/client'
import { ReportarErrorAoSistema } from '../../shared/exceptions/ReportarErroAoSistema'

export interface IUsuarioService {
  lidaComCriacaoDoUsuario(usuarioDTO: UsuarioDTO): Promise<number>
  lidaComBuscaDoUsuarioPorId(id: number): Promise<Usuario | null>
  lidaComAtualizacaoDoUsuario(id: number, data: Partial<UsuarioDTO>): Promise<Usuario | null>
  lidaComRemocaoDoUsuario(id: number): Promise<void>
  lidaComBuscaDeTodosUsuariosDoSistema(): Promise<Usuario[] | null>
}
export class UsuarioService implements IUsuarioService {
  private usuarioRepository: IUsuarioRepository

  constructor(usuarioRepository: IUsuarioRepository) {
    this.usuarioRepository = usuarioRepository
  }

  async lidaComCriacaoDoUsuario(usuarioDTO: UsuarioDTO): Promise<number> {
    const { nome, role = Role.ALUNO } = usuarioDTO

    try {
      if (!nome || typeof nome !== 'string') {
        throw new ReportarErrorAoSistema('Nome é obrigatório e precisa ser uma string.')
      }

      const usuarioId = await this.usuarioRepository.criaUsuario({ nome, role })
      return usuarioId
    } catch (error) {
      throw new ReportarErrorAoSistema('Erro ao tentar salvar usuário ao banco de dados.')
    }
  }

  async lidaComBuscaDoUsuarioPorId(id: number) {
    try {
      const usuario = await this.usuarioRepository.buscaUsuarioPorId(id)
      if (!usuario) {
        throw new Error('Usuario not found')
      }
      return usuario
    } catch (error) {
      throw new Error('Erro ao buscar usuário')
    }
  }
  async lidaComAtualizacaoDoUsuario(id: number, data: Partial<UsuarioDTO>) {
    if (!data.nome) {
      throw new ReportarErrorAoSistema('Não foi informado nenhum parâmetro. Veja a documentação.')
    }

    try {
      const updatedUsuario = await this.usuarioRepository.atualizaUsuario(id, data)
      return updatedUsuario
    } catch (error) {
      throw new Error('Erro ao atualizar o usuário')
    }
  }

  async lidaComRemocaoDoUsuario(id: number) {
    await this.usuarioRepository.removeUsuario(id)
  }

  async lidaComBuscaDeTodosUsuariosDoSistema() {
    try {
      const usuarios = await this.usuarioRepository.buscaPorTodosUsuarios()

      if (!usuarios) {
        return []
      }

      return usuarios
    } catch (error) {
      throw new Error('Error fetching usuario')
    }
  }
}
