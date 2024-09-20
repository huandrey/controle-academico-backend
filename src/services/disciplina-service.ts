import { Disciplina } from "@prisma/client"
import { IDisciplinaRepository } from "../repositories/disciplina-repository"
import { UFCGImporter } from "../importers/implementation/ufcg-importer"
import { Importer } from "../importers/importer"
import { SessionDTO } from "../dtos/session-dto"

export interface IDisciplinaService {
  lidaComImportacaoDasDisciplinasDoDiscente(sessionDTO: SessionDTO, importer: Importer): Promise<number>
}

export class DisciplinaService implements IDisciplinaService {
  private disciplinaRepository: IDisciplinaRepository
  
  constructor(disciplinaRepository: IDisciplinaRepository) {
    this.disciplinaRepository = disciplinaRepository
  }

    async lidaComImportacaoDasDisciplinasDoDiscente(sessionDTO: SessionDTO, importer: Importer): Promise<number> {
      if (!sessionDTO.matricula || !sessionDTO.senha) {
        throw new Error("Login, senha são obrigatórios")
      }

      const { matricula, senha, discenteId } = sessionDTO

const disciplinasImportadas = await importer.importaDisciplinas(discenteId!, matricula, senha)
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
