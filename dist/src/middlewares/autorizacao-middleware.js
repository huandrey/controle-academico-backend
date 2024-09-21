var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { ReportarErrorAoSistema } from "../exceptions/ReportarErroAoSistema";
export class AutorizacaoMiddleware {
    constructor(alunoService) {
        this.segredo = process.env.JWT_SECRET || 'segredo_padrao';
        this.alunoService = alunoService;
    }
    autorizarApenas(roleNecessaria) {
        return (req, res, next) => {
            const cabecalhoAutenticacao = req.headers.authorization;
            if (!cabecalhoAutenticacao) {
                return res.status(401).json({ mensagem: 'Token não fornecido.' });
            }
            const token = cabecalhoAutenticacao.split(' ')[1];
            try {
                const decodificado = jwt.verify(token, this.segredo);
                if (decodificado.role !== roleNecessaria) {
                    return res.status(403).json({ mensagem: 'Acesso negado. Permissão insuficiente.' });
                }
                const customReq = req;
                customReq.user = decodificado;
                next();
            }
            catch (erro) {
                return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
            }
        };
    }
    /**
   *  Esse método checa se um usuário já existe no sistema, ou seja, se já foi adicionado a base
   * Se a classe `alunoService` não for inicializa por algum motivo e esse método for chamada você receberá um erro.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next middleware function.
   * @throws {Error} If the `alunoService` is not properly initialized, a warning message will be returned.
   */
    verificaSeAlunoJaExisteNoSistema(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.body;
            if (!this.alunoService) {
                throw new ReportarErrorAoSistema("AlunoService is undefined. Por favor, verifique se a propriedade foi inicializada corretamente.");
            }
            try {
                const aluno = yield this.alunoService.lidaComBuscaDoAlunoPorMatricula(matricula);
                const customReq = req;
                if (aluno) {
                    customReq.user = {
                        userAlreadyExists: true,
                    };
                }
                next();
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
