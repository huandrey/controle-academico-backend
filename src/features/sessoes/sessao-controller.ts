import { Request, Response } from "express";
import { PayloadUsuarioAlreadyExists } from "../../shared/middlewares/autorizacao-middleware";
import { UsuarioService } from "../../features/usuarios/usuario-service";
import { AlunoService } from "../../features/alunos/aluno-service";
import { DisciplinaService } from "../../features/disciplinas/disciplina-service";
import { SessaoDTO } from "../../features/sessoes/sessao-dto";
import { SessaoService } from "./sessao-service";
import { Role } from "@prisma/client";
import { Importer } from "../../shared/importers/importer";

export class SessaoController {
  private usuarioService: UsuarioService
  private alunoService: AlunoService
  private disciplinaService: DisciplinaService
  private sessaoService: SessaoService

  constructor(usuarioService: UsuarioService, alunoService: AlunoService, disciplinaService: DisciplinaService, sessaoService: SessaoService) {
    this.usuarioService = usuarioService,
      this.alunoService = alunoService
    this.disciplinaService = disciplinaService
    this.sessaoService = sessaoService
  }

  public async criaConexaoComSessao(req: Request, res: Response): Promise<void> {
    interface CustomRequest extends Request {
      usuario: PayloadUsuarioAlreadyExists;
    }

    const sessaoDTO: SessaoDTO = req.body;

    // customReq agora compartilha o mesmo acesso de memória que req
    // const customReq: CustomRequest = req as CustomRequest;

    // const { usuarioAlreadyExists  } = customReq.usuario;

    // if (usuarioAlreadyExists) {
    //   this.retornaDadosDoAluno()
    // }

    this.configuraSessaoDoUsuario(sessaoDTO)


    res.status(200).json({ message: 'Conexão com o sessao criada com sucesso!' })
  }

  private async configuraSessaoDoUsuario(sessaoDTO: SessaoDTO) {
    const { matricula, senha, vinculo, alunoId } = sessaoDTO

    const importer: Importer = this.sessaoService.lidaComIdentificacaoDaInstituicaoDeEnsino(vinculo)

    try {
      await importer.autenticaAluno(matricula, senha)

      const dadosAluno = {
        nome: 'Huandrey',
      }

      const usuarioId: number = await this.usuarioService.lidaComCriacaoDoUsuario({ nome: dadosAluno.nome })

      if (!usuarioId) {
        throw new Error('Erro ao cadastrar o usuário')
      }

      const aluno = await this.alunoService.lidaComCriacaoDoAluno({
        nome: dadosAluno.nome,
        matricula: matricula,
        usuarioId,
      });

      if (!aluno) {
        throw new Error('Erro ao cadastrar o aluno')
      }

      this.disciplinaService.lidaComImportacaoDasDisciplinasDoDiscente({ ...sessaoDTO, alunoId: aluno.id }, importer)
    } catch (err) {
      console.error(err)
    }

  }

}
