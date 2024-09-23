var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ReportarErrorAoSistema } from '../exceptions/ReportarErroAoSistema';
export class AlunoController {
    constructor(AlunoService) {
        this.AlunoService = AlunoService;
    }
    criaAluno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aluno = req.body;
            try {
                yield this.AlunoService.lidaComCriacaoDoAluno(aluno);
                res.status(201).json({ message: "Aluno criado com sucesso!" });
            }
            catch (error) {
                if (error instanceof ReportarErrorAoSistema) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
    buscaAlunoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const AlunoId = parseInt(req.params.id, 10);
            try {
                const student = yield this.AlunoService.lidaComBuscaDoAlunoPorId(AlunoId);
                if (student) {
                    res.status(200).json(student);
                }
                else {
                    res.status(404).json({ error: 'Aluno não encontrado' });
                }
            }
            catch (error) {
                if (error instanceof ReportarErrorAoSistema) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
    buscaAlunoPorMatricula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const matricula = req.body.matricula;
            try {
                const student = yield this.AlunoService.lidaComBuscaDoAlunoPorMatricula(matricula);
                if (student) {
                    res.status(200).json(student);
                }
                else {
                    res.status(404).json({ error: 'Aluno não encontrado' });
                }
            }
            catch (error) {
                if (error instanceof ReportarErrorAoSistema) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
    atualizaAluno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const AlunoId = parseInt(req.params.id, 10);
            const Aluno = req.body;
            try {
                const updatedStudent = yield this.AlunoService.lidaComAtualizacaoDoAluno(AlunoId, Aluno);
                if (updatedStudent) {
                    res.status(200).json(updatedStudent);
                }
                else {
                    res.status(404).json({ error: 'Aluno não encontrado' });
                }
            }
            catch (error) {
                if (error instanceof ReportarErrorAoSistema) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
    deletaAluno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const AlunoId = parseInt(req.params.id, 10);
            try {
                yield this.AlunoService.lidaComRemocaoDoAluno(AlunoId);
                res.status(204).send();
            }
            catch (error) {
                if (error instanceof ReportarErrorAoSistema) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
}
