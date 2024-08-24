import { Disciplina } from "@prisma/client"

export interface Importer {
  importaDisciplinas(discenteId: number, matricula: string, senha: string): Promise<Disciplina[]>
  reportProgress(msg: string): void
}
