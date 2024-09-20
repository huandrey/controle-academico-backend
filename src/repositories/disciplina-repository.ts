import { Disciplina } from "@prisma/client";
import { IDatabase } from "../database/database-interface";

export interface IDisciplinaRepository {
  saveDisciplinas(disciplinas: Disciplina[]): Promise<number>
}

export class DisciplinaRepository implements IDisciplinaRepository {
  private orm: IDatabase

  constructor(orm: IDatabase) {
    this.orm = orm
  }

  saveDisciplinas(disciplinas: Disciplina[]): Promise<number> {
    return this.orm.salvaDisciplinas(disciplinas)
  }
}
