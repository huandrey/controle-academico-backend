var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ReportarErrorAoSistema } from "../exceptions/ReportarErroAoSistema";
export class SistemaController {
    constructor(userService, alunoService, disciplinaService, sistemaService) {
        this.userService = userService,
            this.alunoService = alunoService;
        this.disciplinaService = disciplinaService;
        this.sistemaService = sistemaService;
    }
    autenticaAluno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula, password, vinculo } = req.body;
            try {
                const instituicao = this.sistemaService.lidaComIdentificacaoDaInstituicaoDeEnsino(vinculo);
                const token = yield this.sistemaService.buscaTokenDoUsuarioNaRPE(matricula, password, instituicao);
                const dadosAluno = yield this.sistemaService.importaDadosDoAluno(matricula, password, token, instituicao);
                const user = yield this.userService.lidaComCriacaoDoUsuario({ nome: dadosAluno.nome, role: 'ALUNO' });
                yield this.alunoService.lidaComCriacaoDoAluno(Object.assign(Object.assign({}, dadosAluno), { userId: user.id }));
                res.status(200).json({
                    message: 'Autenticado com sucesso!',
                    data: Object.assign(Object.assign({}, dadosAluno), { userId: user === null || user === void 0 ? void 0 : user.id })
                });
            }
            catch (error) {
                if (error instanceof ReportarErrorAoSistema) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.error(error);
                }
            }
        });
    }
}
