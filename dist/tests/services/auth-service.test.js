var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AuthRepository } from '../../src/repositories/auth-repository';
import { expect } from 'chai';
import { FakeDatabase } from '../../src/database/fake-database';
describe('AuthRepository', () => {
    let fakeDatabase;
    let authRepository;
    beforeEach(() => {
        fakeDatabase = new FakeDatabase();
        authRepository = new AuthRepository(fakeDatabase);
    });
    it('deve adicionar o token de autenticação para um usuário', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = 1;
        const token = 'fake-token';
        yield authRepository.adicionaTokenDeAutenticacao(userId, token);
        const storedToken = fakeDatabase.getTokenByUserId(userId);
        expect(storedToken).equal(token);
    }));
});
