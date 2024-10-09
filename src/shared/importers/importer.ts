import { Disciplina } from "@prisma/client"
import * as cheerio from 'cheerio'
import { DisciplinaHistoricoProps } from "./implementation/ufcg-importer"

export interface Importer {
  autenticaAluno(matricula: string, senha: string): Promise<void>
  obterDisciplinasDoHistoricoAcademico(alunoId: number): Promise<DisciplinaHistoricoProps[]>
  obterDetalhesDaDisciplina(): Promise<DisciplinaHistoricoProps[] | undefined>
}
