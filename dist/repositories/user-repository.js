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
exports.UserRepository = void 0;
class UserRepository {
    constructor(orm) {
        this.orm = orm;
    }
    buscaUsuarioPorId(id) {
        throw new Error("Method not implemented.");
    }
    buscaUsuarioPorEmail(email) {
        throw new Error("Method not implemented.");
    }
    criaUsuario(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.orm.criaUsuario(data);
            return {
                id: user.id,
                token: '',
                nome: user.nome,
                role: user.role,
                createdAt: user.createdAt
            };
        });
    }
    atualizaUsuario(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.atualizaUsuario(id, data);
        });
    }
    deletaUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orm.deletaUsuario(id);
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.buscaUsuarioPorId(id);
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.buscaUsuarioPorEmail(email);
        });
    }
    buscaUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.buscaPorUsuarios();
        });
    }
}
exports.UserRepository = UserRepository;
