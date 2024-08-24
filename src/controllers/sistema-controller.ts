import { Request, Response } from "express";
import { PayloadUserAlreadyExists } from "../middlewares/autorizacao-middleware";
import { UserService } from "../services/user-service";
import { DiscenteService } from "../services/discente-service";
import { DisciplinaService } from "../services/disciplina-service";
import { SessionDTO } from "../dtos/session-dto";
import { SistemaService } from "../services/sistema-service";

export class SistemaController {
  private userService: UserService
  private discenteService: DiscenteService
  private disciplinaService: DisciplinaService
  private sistemaService: SistemaService

  constructor(userService: UserService, discenteService: DiscenteService, disciplinaService: DisciplinaService, sistemaService: SistemaService) {
    this.userService = userService,
    this.discenteService = discenteService
    this.disciplinaService = disciplinaService
    this.sistemaService = sistemaService
  }

  public async criaConexaoComSistema(req: Request, res: Response): Promise<void> {
    interface CustomRequest extends Request {
      user: PayloadUserAlreadyExists;
    }

    const sessionDTO: SessionDTO = req.body;

    // // customReq agora compartilha o mesmo acesso de memória que req 
    // const customReq: CustomRequest = req as CustomRequest;

    // const { userAlreadyExists  } = customReq.user;

    // if (userAlreadyExists) {
    //   this.retornaDadosDoDiscente()
    // }

    this.configuraSistemaDoUsuario(sessionDTO)


    res.status(200).json({ message: 'Conexão com o sistema criada com sucesso!' })
  }

  public atualizaSistema(): void {
    // Implementar a atualização do sistema
  }

  private retornaDadosDoDiscente(): void {
    // Implementar a consulta dos dados do discente
  }

  // Implementar a configuração do sistema do usuário
  private async configuraSistemaDoUsuario(sessionDTO: SessionDTO) {
    // Importa dados do usuário
    // Cria usuário
    const usuario = await this.userService.lidaComCriacaoDoUsuario({ nome: '', role: 'DISCENTE' })
   
    if (!usuario) {
      throw new Error('Erro ao cadastrar o usuário')
    }

    const discente = await this.discenteService.lidaComCriacaoDoDiscente({
      nome: '',
      matricula: sessionDTO.matricula,
      cursoId: 1, // Adicionar o ID do curso
      userId: usuario!.id, // Adicionar o ID do usuário
    });

    if (!discente) {
      throw new Error('Erro ao cadastrar o discente')
    }

    // Identifica a instituição que o aluno possui vínculo
    const importer = this.sistemaService.lidaComIdentificacaoDaInstituicaoDeEnsino(sessionDTO.vinculo)

     // Importa disciplinas do usuário
    this.disciplinaService.lidaComImportacaoDasDisciplinasDoDiscente({ ...sessionDTO, discenteId: discente.id }, importer)

    // Configura as permissões do usuário

    // Cria as rotas do sistema

    // Cria as rotas do sistema do usuário

    // Inicia as rotas do sistema

    // Inicia as rotas do sistema do usuário

    // Inicia a API
  }

}
