export class DisciplinaRepository {
    constructor(orm) {
        this.orm = orm;
    }
    saveDisciplinas(disciplinas) {
        return this.orm.salvaDisciplinas(disciplinas);
    }
}
