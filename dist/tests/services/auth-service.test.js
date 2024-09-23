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
const auth_repository_1 = require("../../src/repositories/auth-repository");
const chai_1 = require("chai");
const fake_database_1 = require("../../src/database/fake-database");
describe('AuthRepository', () => {
    let fakeDatabase;
    let authRepository;
    beforeEach(() => {
        fakeDatabase = new fake_database_1.FakeDatabase();
        authRepository = new auth_repository_1.AuthRepository(fakeDatabase);
    });
    it('deve adicionar o token de autenticação para um usuário', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = 1;
        const token = 'fake-token';
        yield authRepository.adicionaTokenDeAutenticacao(userId, token);
        const storedToken = fakeDatabase.getTokenByUserId(userId);
        (0, chai_1.expect)(storedToken).equal(token);
    }));
});
