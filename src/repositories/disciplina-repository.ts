import { Disciplina } from "@prisma/client";

export interface IDisciplinaRepository {
  saveDisciplinas(disciplinas: any): Promise<Disciplina[]>
}

export class DisciplinaRepository implements IDisciplinaRepository {
  constructor() {
  }

  saveDisciplinas(disciplinas: any): Promise<Disciplina[]> {
    throw new Error("Method not implemented.");
  }
}
