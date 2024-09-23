"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoRepository = void 0;
class AlunoRepository {
    constructor(orm) {
        this.orm = orm;
    }
    criaAluno(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.criaAluno(data);
        });
    }
    atualizaAluno(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.atualizaAluno(id, data);
        });
    }
    deletaAluno(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orm.deletaAluno(id);
        });
    }
    buscaAlunoPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.buscaAlunoPorId(id);
        });
    }
    buscaAlunoPorMatricula(matricula) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.buscaAlunoPorMatricula(matricula);
        });
    }
    buscaAlunoPorEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.buscaAlunoPorEmail(email);
        });
    }
}
exports.AlunoRepository = AlunoRepository;
