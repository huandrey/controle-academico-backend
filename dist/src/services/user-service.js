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
export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    lidaComCriacaoDoUsuario(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nome, role }) {
            try {
                if (!nome || typeof nome !== 'string') {
                    throw new ReportarErrorAoSistema('Nome é obrigatório e precisa ser uma string.');
                }
                if (!role || !['ADMIN', 'ALUNO', 'DOCENTE'].includes(role)) {
                    throw new ReportarErrorAoSistema('Uma role é obrigatória. Veja a documentação');
                }
                const user = yield this.userRepository.criaUsuario({ nome, role });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    lidaComBuscaDoUsuarioPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.buscaUsuarioPorId(id);
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            }
            catch (error) {
                throw new Error('Erro ao buscar usuário');
            }
        });
    }
    lidaComAtualizacaoDoUsuario(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.nome || !data.role) {
                throw new ReportarErrorAoSistema('Nome e role são obrigatórios');
            }
            try {
                const updatedUser = yield this.userRepository.atualizaUsuario(id, data);
                return updatedUser;
            }
            catch (error) {
                throw new Error('Erro ao atualizar o usuário');
            }
        });
    }
    lidaComRemocaoDoUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userRepository.deletaUsuario(id);
            }
            catch (error) {
                throw new Error('Error deleting user');
            }
        });
    }
    lidaComBuscaDosUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.buscaUsuarios();
                if (!users) {
                    return [];
                }
                return users;
            }
            catch (error) {
                throw new Error('Error fetching user');
            }
        });
    }
}
