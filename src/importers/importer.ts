import { Disciplina } from "@prisma/client"

export interface Importer {
  autenticaUsuario(matricula: string, senha: string): Promise<string[]>
  importaDisciplinas(discenteId: number, matricula: string, senha: string): Promise<Disciplina[]>
  reportProgress(msg: string): void
}
