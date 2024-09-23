import { IDatabase } from "../database/database-interface"

export interface IAuthRepository {
  adicionaTokenDeAutenticacao(id: number, token: string): Promise<void>
}

export class AuthRepository implements IAuthRepository {
  private orm: IDatabase

  constructor(orm: IDatabase) {
    this.orm = orm
  }

  async adicionaTokenDeAutenticacao(userId: number, token: string): Promise<void> {
    await this.orm.adicionaTokenDeAutenticacao(userId, token)
  }
}
