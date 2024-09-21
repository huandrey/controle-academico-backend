import { AuthRepository } from '../../src/repositories/auth-repository';
import { expect } from 'chai';
import { FakeDatabase } from '../../src/database/fake-database';

describe('AuthRepository', () => {
  let fakeDatabase: FakeDatabase;
  let authRepository: AuthRepository;

  beforeEach(() => {
    fakeDatabase = new FakeDatabase();
    authRepository = new AuthRepository(fakeDatabase);
  });

  it('deve adicionar o token de autenticação para um usuário', async () => {
    const userId = 1;
    const token = 'fake-token';

    await authRepository.adicionaTokenDeAutenticacao(userId, token);

    const storedToken = fakeDatabase.getTokenByUserId(userId);
    expect(storedToken).equal(token);
  });
});
