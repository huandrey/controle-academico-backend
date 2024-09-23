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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const ReportarErroAoSistema_1 = require("../exceptions/ReportarErroAoSistema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
        this.segredo = process.env.JWT_SECRET || 'segredo_padrao';
    }
    lidaComGeracaoDoToken(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                id: usuario.id,
                role: usuario.role,
            };
            const token = jsonwebtoken_1.default.sign(payload, this.segredo, {
                expiresIn: '1h',
            });
            try {
                yield this.authRepository.adicionaTokenDeAutenticacao(usuario.id, token);
                return token;
            }
            catch (err) {
                throw new ReportarErroAoSistema_1.ReportarErrorAoSistema("Erro ao tentar salvar token no banco de dados");
            }
        });
    }
    lidaComGeracaoDoTokenDoDiscente(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                id: usuario.id,
            };
            const token = jsonwebtoken_1.default.sign(payload, this.segredo, {
                expiresIn: '1h',
            });
            try {
                yield this.authRepository.adicionaTokenDeAutenticacao(usuario.id, token);
                return token;
            }
            catch (err) {
                throw new ReportarErroAoSistema_1.ReportarErrorAoSistema("Erro ao tentar salvar token no banco de dados", err);
            }
        });
    }
}
exports.AuthService = AuthService;
