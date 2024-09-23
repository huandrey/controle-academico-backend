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
exports.AlunoService = void 0;
const ReportarErroAoSistema_1 = require("../exceptions/ReportarErroAoSistema");
class AlunoService {
    constructor(alunoRepository) {
        this.alunoRepository = alunoRepository;
    }
    lidaComCriacaoDoAluno(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.nome || !data.matricula || !data.userId) {
                throw new ReportarErroAoSistema_1.ReportarErrorAoSistema('Dados insuficientes para criar o usuário.');
            }
            try {
                data.userId = Number(data.userId);
                const userAlreadyExists = yield this.alunoRepository.buscaAlunoPorMatricula(data.matricula);
                if (userAlreadyExists) {
                    throw new ReportarErroAoSistema_1.ReportarErrorAoSistema('Matrícula já cadastrada.');
                }
                const aluno = yield this.alunoRepository.criaAluno(data);
                return aluno;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error creating aluno');
            }
        });
    }
    lidaComBuscaDoAlunoPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new ReportarErroAoSistema_1.ReportarErrorAoSistema('ID do usuário não informado.');
            }
            try {
                const aluno = yield this.alunoRepository.buscaAlunoPorId(id);
                if (!aluno) {
                    throw new Error('User not found');
                }
                return aluno;
            }
            catch (error) {
                throw new Error('Error fetching aluno');
            }
        });
    }
    lidaComBuscaDoAlunoPorMatricula(matricula) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!matricula) {
                throw new ReportarErroAoSistema_1.ReportarErrorAoSistema('Matricula do usuário não informada.');
            }
            try {
                const aluno = yield this.alunoRepository.buscaAlunoPorMatricula(matricula);
                return aluno;
            }
            catch (error) {
                throw new Error('Error fetching aluno');
            }
        });
    }
    lidaComAtualizacaoDoAluno(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new ReportarErroAoSistema_1.ReportarErrorAoSistema('ID do usuário não informado.');
            }
            if (!data.nome || !data.matricula || !data.userId) {
                throw new ReportarErroAoSistema_1.ReportarErrorAoSistema('Dados insuficientes para atualizar o usuário.');
            }
            try {
                const alunoAtualizado = yield this.alunoRepository.atualizaAluno(id, data);
                return alunoAtualizado;
            }
            catch (error) {
                throw new Error('Error updating aluno');
            }
        });
    }
    lidaComRemocaoDoAluno(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new ReportarErroAoSistema_1.ReportarErrorAoSistema('ID do usuário não informado.');
            }
            try {
                yield this.alunoRepository.deletaAluno(id);
            }
            catch (error) {
                throw new Error('Error deleting aluno');
            }
        });
    }
}
exports.AlunoService = AlunoService;
