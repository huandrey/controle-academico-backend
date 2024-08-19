import { Disciplina } from "@prisma/client"
import { IDisciplinaRepository } from "../repositories/disciplina-repository"
import { UFCGImporter } from "../importers/implementation/ufcg-importer"

export interface IDisciplinaService {
  importUserData(login: string, senha: string, vinculo: string): Promise<Disciplina[]>
}

export class DisciplinaService implements IDisciplinaService {
  private disciplinaRepository: IDisciplinaRepository
  
  constructor(disciplinaRepository: IDisciplinaRepository) {
    this.disciplinaRepository = disciplinaRepository
  }

    async importUserData(login: string, senha: string, vinculo: string): Promise<Disciplina[]> {
    const importer = this.switchImporter(vinculo)
    const disciplinasImportadas = await importer.importDisciplinas(login, senha, vinculo)
    console.log(`importUserData: ${disciplinasImportadas}`)

    const disciplinas = await this.disciplinaRepository.saveDisciplinas(disciplinasImportadas)

    return disciplinas
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
