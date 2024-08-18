import { Disciplina } from "@prisma/client";
import { IDatabase } from "../database/database-interface";

export interface IDisciplinaRepository {
  saveDisciplinas(disciplinas: any): Promise<Disciplina[]>
}

export class DisciplinaRepository implements IDisciplinaRepository {
  private orm: IDatabase

  constructor(orm: IDatabase) {
    this.orm = orm
  }

  saveDisciplinas(disciplinas: any): Promise<Disciplina[]> {
    throw new Error("Method not implemented.");
  }
}
