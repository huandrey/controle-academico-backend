import { IDatabase } from "../../shared/database/database-interface";
import { DisciplinaHistoricoProps } from "../../shared/importers/implementation/ufcg-importer";

export interface IDisciplinaRepository {
  saveDisciplinas(disciplinas: DisciplinaHistoricoProps[]): Promise<number>
}

export class DisciplinaRepository implements IDisciplinaRepository {
  private orm: IDatabase

  constructor(orm: IDatabase) {
    this.orm = orm
  }

  saveDisciplinas(disciplinas: DisciplinaHistoricoProps[]): Promise<number> {
    return this.orm.salvaVariasDisciplinas(disciplinas)
  }
}
