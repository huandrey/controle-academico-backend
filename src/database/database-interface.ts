import { Discente, Disciplina, User } from "@prisma/client"
import { UserDTO } from "../dtos/user-dto"
import { DiscenteDTO } from "../dtos/student-dto"

export interface IDatabase {
  criaUsuario(data: UserDTO): Promise<User>
  buscaUsuarioPorId(id: number): Promise<User | null>
  buscaUsuarioPorEmail(email: string): Promise<User | null>
  atualizaUsuario(id: number, data: Partial<UserDTO>): Promise<User>
  deletaUsuario(id: number): Promise<void>
  buscaPorUsuarios(): Promise<User[] | null>

  criaDiscente(data: DiscenteDTO): Promise<Discente>
  atualizaDiscente(id: number, data: Partial<DiscenteDTO>): Promise<Discente>
  deletaDiscente(id: number): Promise<void>
  buscaDiscentePorId(id: number): Promise<Discente | null>
  buscaDiscentePorMatricula(matricula: string): Promise<Discente>
  buscaDiscentePorEmail(email: string): Promise<Discente>

  autenticaUsuario(email: string, senha: string): Promise<User | null>
  adicionaTokenDeAutenticacao(id: number, token: string): Promise<void>

  salvaDisciplinas(data: Disciplina[]): Promise<number>
}
