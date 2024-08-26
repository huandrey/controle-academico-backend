import { Request, Response } from "express";
import { PayloadUserAlreadyExists } from "../middlewares/autorizacao-middleware";
import { UserService } from "../services/user-service";
import { DiscenteService } from "../services/discente-service";
import { DisciplinaService } from "../services/disciplina-service";
import { SessionDTO } from "../dtos/session-dto";
import { SistemaService } from "../services/sistema-service";
import { ReportarErrorAoSistema } from "../exceptions/ReportarErroAoSistema";

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

    // customReq agora compartilha o mesmo acesso de memória que req 
    // const customReq: CustomRequest = req as CustomRequest;

    // const { userAlreadyExists  } = customReq.user;

    // if (userAlreadyExists) {
    //   this.retornaDadosDoDiscente()
    // }

    const sessionDTO: SessionDTO = req.body;
    try {
      this.configuraSistemaDoUsuario(sessionDTO)
      res.status(200).json({ message: 'Conexão com o sistema criada com sucesso!' })
    } catch (error) {
      console.log('erro sistema')
      console.log(error)
      if (error instanceof ReportarErrorAoSistema) {
        res.status(400).send({
          message: error.message
        })
      }
    }
  }

  public atualizaSistema(): void {
    // Implementar a atualização do sistema
  }

  private retornaDadosDoDiscente(): void {
    // Implementar a consulta dos dados do discente
  }

  // Implementar a configuração do sistema do usuário
  private async configuraSistemaDoUsuario(sessionDTO: SessionDTO) {
   try {
    const importer = this.sistemaService.lidaComIdentificacaoDaInstituicaoDeEnsino(sessionDTO.vinculo)
    const dadosDiscente = importer.autenticaUsuario(sessionDTO.matricula, sessionDTO.senha)
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

     // Importa e salva disciplinas do usuário
    this.disciplinaService.lidaComImportacaoDasDisciplinasDoDiscente({ ...sessionDTO, discenteId: discente.id }, importer)
   } catch (error) {
    throw error
   }
  }

}
