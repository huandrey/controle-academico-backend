import { Aluno, Disciplina, Usuario } from "@prisma/client"
import { AlunoDTO } from "../../features/alunos/aluno-dto"
import { UsuarioDTO } from "../../features/usuarios/usuario-dto"
import { DisciplinaHistoricoProps } from "../importers/implementation/ufcg-importer"

export interface IDatabase {
  salvaUsuario(usuarioDTO: UsuarioDTO): Promise<Usuario>
  atualizaUsuario(id: number, data: Partial<UsuarioDTO>): Promise<Usuario>
  adicionaTokenDeAutenticacaoAoUsuario(id: number, token: string): Promise<void>
  buscaUsuarioPorId(id: number): Promise<Usuario | null>
  buscaPorTodosUsuarios(): Promise<Usuario[] | null>
  removeUsuario(id: number): Promise<void>

  salvaAluno(data: AlunoDTO): Promise<Aluno>
  atualizaAluno(id: number, data: Partial<AlunoDTO>): Promise<Aluno>
  buscaAlunoPorId(id: number): Promise<Aluno | null>
  buscaAlunoPorMatricula(matricula: string): Promise<Aluno | null>
  buscaInformacoesDoAlunoPorId(id: number): Promise<Omit<Aluno, 'usuarioId'> | null>
  removeAluno(id: number): Promise<void>


  salvaVariasDisciplinas(data: DisciplinaHistoricoProps[]): Promise<number>
}
