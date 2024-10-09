import { Request, Response } from "express";
import { PayloadUsuarioAlreadyExists } from "../../shared/middlewares/autorizacao-middleware";
import { UsuarioService } from "../../features/usuarios/usuario-service";
import { AlunoService } from "../../features/alunos/aluno-service";
import { DisciplinaService } from "../../features/disciplinas/disciplina-service";
import { SessaoDTO } from "../../features/sessoes/sessao-dto";
import { SessaoService } from "./sessao-service";
import { Importer } from "../../shared/importers/importer";
import { ReportarErrorAoSistema } from "../../shared/exceptions/ReportarErroAoSistema";

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
    const sessaoDTO: SessaoDTO = req.body;

    try {
      const aluno = await this.configuraSessaoDoUsuario(sessaoDTO)
      res.status(200).json({ message: 'Conexão com o sistema criada com sucesso!', data: aluno })
    } catch (error) {
      if (error instanceof ReportarErrorAoSistema) {
        res.status(400).json({ error: error.message })
      } else {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  private async configuraSessaoDoUsuario(sessaoDTO: SessaoDTO) {
    const { matricula, senha, vinculo, alunoId } = sessaoDTO

    const importer: Importer = this.sessaoService.lidaComIdentificacaoDaInstituicaoDeEnsino(vinculo)
    await importer.autenticaAluno(matricula, senha) // Autentica usuário e salva cookie retornado da response 

    const dadosAluno = {
      nome: 'Huandrey',
    }

    const alunoJaExiste = await this.alunoService.lidaComBuscaDoAlunoPorMatricula(matricula)
    if (alunoJaExiste) {
      return await this.alunoService.lidaComBuscaDeInformacoesDoAlunoPorId(alunoJaExiste.id)
    }

    const usuarioId: number = await this.usuarioService.lidaComCriacaoDoUsuario({ nome: dadosAluno.nome })

    if (!usuarioId) {
      throw new ReportarErrorAoSistema('Erro ao cadastrar o usuário')
    }

    const aluno = await this.alunoService.lidaComCriacaoDoAluno({
      nome: dadosAluno.nome,
      matricula: matricula,
      usuarioId,
    });

    if (!aluno) {
      throw new ReportarErrorAoSistema('Erro ao cadastrar o aluno')
    }

    await this.disciplinaService.lidaComImportacaoDasDisciplinasDoDiscente({ ...sessaoDTO, alunoId: aluno.id }, importer)
    return await this.alunoService.lidaComBuscaDeInformacoesDoAlunoPorId(aluno.id)
  }
}
