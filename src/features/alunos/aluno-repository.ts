import { Aluno } from "@prisma/client"
import { AlunoDTO } from "./aluno-dto"
import { IDatabase } from "../../shared/database/database-interface"

export interface IAlunoRepository {
  salvaAluno(data: AlunoDTO): Promise<Aluno>
  atualizaAluno(id: number, data: Partial<AlunoDTO>): Promise<Aluno | null>
  removeAluno(id: number): Promise<void>
  buscaAlunoPorId(id: number): Promise<Aluno | null>
  buscaAlunoPorMatricula(matricula: string): Promise<Aluno | null>
  buscaInformacoesDoAlunoPorId(id: number): Promise<Omit<Aluno, 'usuarioId'> | null>
}

export type AtualizaAlunoDTO = {
  email?: string
  name?: string
  password?: string
  role?: string
}

export class AlunoRepository implements IAlunoRepository {
  private orm: IDatabase

  constructor(orm: IDatabase) {
    this.orm = orm
  }

  async salvaAluno(data: AlunoDTO): Promise<Aluno> {
    return this.orm.salvaAluno(data)
  }

  async atualizaAluno(id: number, data: AlunoDTO): Promise<Aluno | null> {
    return this.orm.atualizaAluno(id, data)
  }

  async removeAluno(id: number): Promise<void> {
    await this.orm.removeAluno(id)
  }

  async buscaAlunoPorId(id: number): Promise<Aluno | null> {
    return this.orm.buscaAlunoPorId(id)
  }

  async buscaAlunoPorMatricula(matricula: string): Promise<Aluno | null> {
    return this.orm.buscaAlunoPorMatricula(matricula)
  }

  async buscaInformacoesDoAlunoPorId(id: number): Promise<Omit<Aluno, 'usuarioId'> | null> {
    return this.orm.buscaInformacoesDoAlunoPorId(id)
  }
}
