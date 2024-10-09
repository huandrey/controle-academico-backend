import { Role } from "@prisma/client";
import { ReportarErrorAoSistema } from "../../shared/exceptions/ReportarErroAoSistema";
import { IAutenticacaoRepository } from "./autenticacao-repository"
import jwt from 'jsonwebtoken'

export interface IAutenticacaoService {
  lidaComGeracaoDoToken(usuario: { id: number, role: string }): Promise<string>
}

export class AutenticacaoService implements IAutenticacaoService {
  private autenticacaoRepository: IAutenticacaoRepository
  private segredo: string;

  constructor(autenticacaoRepository: IAutenticacaoRepository) {
    this.autenticacaoRepository = autenticacaoRepository
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
      await this.autenticacaoRepository.adicionaTokenDeAutenticacao(usuario.id, token)
      return token;
    } catch (err) {
      throw new ReportarErrorAoSistema("Erro ao tentar salvar token no banco de dados")
    }
  }

  public async lidaComGeracaoDoTokenDoDiscente(usuario: { id: number }): Promise<string> {
    const payload = {
      id: usuario.id,
      role: Role.ALUNO,
    };

    const token = jwt.sign(payload, this.segredo, {
      expiresIn: '1h',
    });

    try {
      await this.autenticacaoRepository.adicionaTokenDeAutenticacao(usuario.id, token)
      return token;
    } catch (err) {
      throw new ReportarErrorAoSistema("Erro ao tentar salvar token no banco de dados", err)
    }
  }
}
