import { Role } from "@prisma/client";
import { ReportarErrorAoSistema } from "../exceptions/ReportarErroAoSistema";
import { IAuthRepository } from "../repositories/auth-repository"
import jwt from 'jsonwebtoken'

export interface IAuthService {
  lidaComGeracaoDoToken(usuario: { id: number, role: string }): Promise<string>
}

export class AuthService implements IAuthService {
  private authRepository: IAuthRepository
  private segredo: string;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository
    this.segredo = process.env.JWT_SECRET || 'segredo_padrao'
  }
  
  public async lidaComGeracaoDoToken(usuario: { id: number, role: string }): Promise<string> {
    const payload = {
      id: usuario.id,
      role: usuario.role,
    };

    const token = jwt.sign(payload, this.segredo, {
      expiresIn: '1h',
    });

    try {
      await this.authRepository.adicionaTokenDeAutenticacao(usuario.id, token)
      return token;
    } catch (err) {
      throw new ReportarErrorAoSistema("Erro ao tentar salvar token no banco de dados")
    }
  }

  public async lidaComGeracaoDoTokenDoDiscente(usuario: { id: number }): Promise<string> {
    const payload = {
      id: usuario.id,
    };

    const token = jwt.sign(payload, this.segredo, {
      expiresIn: '1h',
    });

    try {
      await this.authRepository.adicionaTokenDeAutenticacao(usuario.id, token)
      return token;
    } catch (err) {
      throw new ReportarErrorAoSistema("Erro ao tentar salvar token no banco de dados", err)
    }
  }
}
