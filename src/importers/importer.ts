import { Disciplina } from "@prisma/client"
import { AutenticaUsuarioResponse } from "./api/autentica_usuario_response"
import { ImportaDadosAlunoResponse } from "./api/importa_dados_aluno_response"

export interface Importer {
  buscaTokenDoUsuarioNaRPE(matricula: string, senha: string): Promise<string>
  importaDadosDoAluno(matricula: string, senha: string, token: string): Promise<ImportaDadosAlunoResponse>
  // autenticaUsuario(matricula: string, senha: string): Promise<AutenticaUsuarioResponse>
  // importaDisciplinas(discenteId: number, matricula: string, senha: string)
  // reportProgress(msg: string): void
}
