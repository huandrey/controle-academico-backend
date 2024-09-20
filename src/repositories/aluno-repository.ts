import { Aluno } from "@prisma/client"
import { AlunoDTO } from "../dtos/aluno-dto"
import { IDatabase } from "../database/database-interface"

export interface IAlunoRepository {
  criaAluno(data: AlunoDTO): Promise<Aluno>
  atualizaAluno(id: number, data: Partial<AlunoDTO>): Promise<Aluno | null>
  deletaAluno(id: number): Promise<void>
  buscaAlunoPorId(id: number): Promise<Aluno | null>
  buscaAlunoPorEmail(email: string): Promise<Aluno | null>
  buscaAlunoPorMatricula(matricula: string): Promise<Aluno | null>
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

  async criaAluno(data: Aluno): Promise<Aluno> {
    return this.orm.criaAluno(data)
  }

  async atualizaAluno(id: number, data: AlunoDTO): Promise<Aluno | null> {
    return this.orm.atualizaAluno(id, data)
  }

  async deletaAluno(id: number): Promise<void> {
    await this.orm.deletaAluno(id)
  }

  async buscaAlunoPorId(id: number): Promise<Aluno | null> {
    return this.orm.buscaAlunoPorId(id)
  }

  async buscaAlunoPorMatricula(matricula: string): Promise<Aluno | null> {
    return this.orm.buscaAlunoPorMatricula(matricula)
  }

  async buscaAlunoPorEmail(email: string): Promise<Aluno | null> {
    return this.orm.buscaAlunoPorEmail(email)
  }
}
