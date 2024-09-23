var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Fake database implementation
export class FakeDatabase {
    constructor() {
        this.tokens = new Map();
    }
    criaUsuario(data) {
        throw new Error("Method not implemented.");
    }
    buscaUsuarioPorId(id) {
        throw new Error("Method not implemented.");
    }
    buscaUsuarioPorEmail(email) {
        throw new Error("Method not implemented.");
    }
    atualizaUsuario(id, data) {
        throw new Error("Method not implemented.");
    }
    deletaUsuario(id) {
        throw new Error("Method not implemented.");
    }
    buscaPorUsuarios() {
        throw new Error("Method not implemented.");
    }
    criaAluno(data) {
        throw new Error("Method not implemented.");
    }
    atualizaAluno(id, data) {
        throw new Error("Method not implemented.");
    }
    deletaAluno(id) {
        throw new Error("Method not implemented.");
    }
    buscaAlunoPorId(id) {
        throw new Error("Method not implemented.");
    }
    buscaAlunoPorMatricula(matricula) {
        throw new Error("Method not implemented.");
    }
    buscaAlunoPorEmail(email) {
        throw new Error("Method not implemented.");
    }
    autenticaUsuario(email, senha) {
        throw new Error("Method not implemented.");
    }
    salvaDisciplinas(data) {
        throw new Error("Method not implemented.");
    }
    adicionaTokenDeAutenticacao(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulando a adição do token no banco de dados
            this.tokens.set(userId, token);
        });
    }
    getTokenByUserId(userId) {
        return this.tokens.get(userId);
    }
}
