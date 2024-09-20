import { UFCGImporter } from "../importers/implementation/ufcg-importer"
import { Importer } from "../importers/importer"

export interface ISistemaService {
  lidaComIdentificacaoDaInstituicaoDeEnsino(vinculo: string): Importer
}
export class SistemaService implements ISistemaService {
  lidaComIdentificacaoDaInstituicaoDeEnsino(vinculo: string): Importer {
    return this.switchImporter(vinculo)
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
