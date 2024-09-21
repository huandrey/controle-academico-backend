"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplinaRepository = void 0;
class DisciplinaRepository {
    constructor(orm) {
        this.orm = orm;
    }
    saveDisciplinas(disciplinas) {
        return this.orm.salvaDisciplinas(disciplinas);
    }
}
exports.DisciplinaRepository = DisciplinaRepository;
