import { IDatabase } from "../database/database-interface"

export interface IAuthRepository {
  adicionaTokenDeAutenticacao(id: number, token: string): Promise<void>
}

export class AuthRepository implements IAuthRepository {
  private orm: IDatabase

  constructor(orm: IDatabase) {
    this.orm = orm
  }

  // async validateUserCredentials(email: string, password: string): Promise<Use | null> {
  //   const user = await this.orm.user.findUnique({ where: { email } })
  //   if (user && user.password === password) {  // Adicione hash/salt em produçãoreturn user
  //   }
  //   return null
  // }

  async adicionaTokenDeAutenticacao(userId: number, token: string): Promise<void> {
    await this.orm.adicionaTokenDeAutenticacao(userId, token)
  }
}
