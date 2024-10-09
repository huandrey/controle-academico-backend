import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import { ReportarErrorAoSistema } from "../exceptions/ReportarErroAoSistema"
import { AlunoService, IAlunoService } from "../../features/alunos/aluno-service"

interface PayloadToken {
  id: number;
  role: string;
  iat: number;
  exp: number;
}

export interface PayloadUsuarioAlreadyExists extends Partial<PayloadToken> {
  usuarioAlreadyExists: boolean;
}

export class AutorizacaoMiddleware {
  private segredo: string;
  private alunoService?: AlunoService

  constructor(alunoService?: AlunoService) {
    this.segredo = process.env.JWT_SECRET || 'segredo_padrao'
    this.alunoService = alunoService

    console.log(alunoService)
  }

  public autorizarApenas(roleNecessaria: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const cabecalhoAutenticacao = req.headers.authorization;

      if (!cabecalhoAutenticacao) {
        return res.status(401).json({ mensagem: 'Token não fornecido.' });
      }

      const token = cabecalhoAutenticacao.split(' ')[1];

      try {
        const decodificado = jwt.verify(token, this.segredo) as PayloadToken;

        if (decodificado.role !== roleNecessaria) {
          return res.status(403).json({ mensagem: 'Acesso negado. Permissão insuficiente.' });
        }

        interface CustomRequest extends Request {
          usuario: PayloadToken;
        }
        const customReq: CustomRequest = req as CustomRequest;
        customReq.usuario = decodificado;
        next()
      } catch (erro) {
        return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
      }
    };
  }

  /**
 *  Esse método checa se um usuário já existe no sistema, ou seja, se já foi adicionado a base
 * Se a classe `alunoService` não for inicializa por algum motivo e esse método for chamada você receberá um erro.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 * @throws {Error} If the `alunoService` is not properly initialized, a warning message will be returned.
 */
  public async verificaSeAlunoJaExisteNoSistema(req: Request, res: Response, next: NextFunction) {
    const { matricula } = req.body;

    if (!this.alunoService) {
      throw new ReportarErrorAoSistema("AlunoService is undefined. Por favor, verifique se a propriedade foi inicializada corretamente.")
    }

    try {
      const aluno = await this.alunoService.lidaComBuscaDoAlunoPorMatricula(matricula);

      interface CustomRequest extends Request {
        usuario: PayloadUsuarioAlreadyExists;
      }
      const customReq: CustomRequest = req as CustomRequest;

      if (aluno) {
        customReq.usuario = {
          usuarioAlreadyExists: true,
        }
      }

      next();
    } catch (error) {
      if (error instanceof ReportarErrorAoSistema) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }
}
