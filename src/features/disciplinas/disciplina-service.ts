import { Disciplina } from "@prisma/client"
import { IDisciplinaRepository } from "../../features/disciplinas/disciplina-repository"
import { UFCGImporter } from "../../shared/importers/implementation/ufcg-importer"
import { Importer } from "../../shared/importers/importer"
import { SessaoDTO } from "../../features/sessoes/sessao-dto"

export interface IDisciplinaService {
  lidaComImportacaoDasDisciplinasDoDiscente(sessaoDTO: SessaoDTO, importer: Importer): Promise<number>
}

export class DisciplinaService implements IDisciplinaService {
  private disciplinaRepository: IDisciplinaRepository

  constructor(disciplinaRepository: IDisciplinaRepository) {
    this.disciplinaRepository = disciplinaRepository
  }

  async lidaComImportacaoDasDisciplinasDoDiscente(sessaoDTO: SessaoDTO, importer: Importer): Promise<number> {
    const { matricula, senha, alunoId } = sessaoDTO

    if (!sessaoDTO.matricula || !sessaoDTO.senha) {
      throw new Error("Login, senha são obrigatórios")
    }


    const disciplinasImportadas = await importer.obterDisciplinasDoHistoricoAcademico(alunoId!)
    const disciplinasImportadasDetalhadas = await importer.obterDetalhesDaDisciplina()

    console.log(`importUserData: ${JSON.stringify(disciplinasImportadas, null, 2)}`)

    const countDisciplinasCriadas = await this.disciplinaRepository.saveDisciplinas(disciplinasImportadas)

    return countDisciplinasCriadas
  }

  switchImporter(vinculo: string) {
    switch (vinculo) {
      case "UFCG":
        return new UFCGImporter()
      default:
        throw new Error("Importer error")
    }
  }
}
