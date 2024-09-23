import { Aluno, Disciplina, User } from "@prisma/client"
import { UserDTO } from "../dtos/user-dto"
import { AlunoDTO } from "../dtos/aluno-dto"

export interface IDatabase {
  criaUsuario(data: UserDTO): Promise<User>
  buscaUsuarioPorId(id: number): Promise<User | null>
  buscaUsuarioPorEmail(email: string): Promise<User | null>
  atualizaUsuario(id: number, data: Partial<UserDTO>): Promise<User>
  deletaUsuario(id: number): Promise<void>
  buscaPorUsuarios(): Promise<User[] | null>

  criaAluno(data: AlunoDTO): Promise<Aluno>
  atualizaAluno(id: number, data: Partial<AlunoDTO>): Promise<Aluno>
  deletaAluno(id: number): Promise<void>
  buscaAlunoPorId(id: number): Promise<Aluno | null>
  buscaAlunoPorMatricula(matricula: string): Promise<Aluno | null>
  buscaAlunoPorEmail(email: string): Promise<Aluno>

  autenticaUsuario(email: string, senha: string): Promise<User | null>
  adicionaTokenDeAutenticacao(id: number, token: string): Promise<void>

  salvaDisciplinas(data: Disciplina[]): Promise<number>
}
