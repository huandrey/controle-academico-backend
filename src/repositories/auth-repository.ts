export interface IAuthRepository {
  validateUserCredentials(email: string, password: string): Promise<User | null>
  generateToken(user: User): Promise<string>
  verifyToken(token: string): Promise<User | null>
}

export type User = {
  id: string
  email: string
  name: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export class AuthRepository implements IAuthRepository {
  private orm: any
  private jwtService: any

  constructor(orm: any, jwtService: any) {
    this.orm = orm
    this.jwtService = jwtService
  }

  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.orm.user.findUnique({ where: { email } })
    if (user && user.password === password) {  // Adicione hash/salt em produçãoreturn user
    }
    return null
  }

  async generateToken(user: User): Promise<string> {
    return this.jwtService.sign({ userId: user.id, email: user.email, role: user.role })
  }

  async verifyToken(token: string): Promise<User | null> {
    const decoded = this.jwtService.verify(token)
    if (!decoded) return null

    return this.orm.user.findUnique({ where: { id: decoded.userId } })
  }
}
