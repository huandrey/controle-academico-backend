import { Request, Response } from "express";
import { DiscenteController } from "./discente-controller";
import { DisciplinaController } from "./disciplina-controller";
import { UserController } from "./user-controller";
import { PayloadUserAlreadyExists } from "../middlewares/autorizacao-middleware";

export class SistemaController {
  private userController: UserController
  private discenteController: DiscenteController
  private disciplinaController: DisciplinaController

  constructor(userController: UserController, discenteController: DiscenteController, disciplinaController: DisciplinaController) {
    this.userController = userController,
    this.discenteController = discenteController
    this.disciplinaController = disciplinaController
  }

  public async criaConexaoComSistema(req: Request, res: Response): Promise<void> {
    interface CustomRequest extends Request {
      user: PayloadUserAlreadyExists;
    }

    // customReq agora compartilha o mesmo acesso de memória que req 
    const customReq: CustomRequest = req as CustomRequest;

    const { userAlreadyExists  } = customReq.user;

    if (userAlreadyExists) {
      this.retornaDadosDoDiscente()
    }

    this.configuraSistemaDoUsuario()

    // Implementar a criação do sistema

    // Implementar a criação do sistema
  }

  public atualizaSistema(): void {
    // Implementar a atualização do sistema
  }

  private retornaDadosDoDiscente(): void {
    // Implementar a consulta dos dados do discente
  }

  private configuraSistemaDoUsuario() {
    // Implementar a configuração do sistema do usuário

    // Importa disciplinas do usuário

    // Importa dados do usuário

    // Configura as permissões do usuário

    // Cria as rotas do sistema

    // Cria as rotas do sistema do usuário

    // Inicia as rotas do sistema

    // Inicia as rotas do sistema do usuário

    // Inicia a API
  }
}
