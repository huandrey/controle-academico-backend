import { UFCGImporter } from "../../shared/importers/implementation/ufcg-importer"
import { Importer } from "../../shared/importers/importer"

export interface ISessaoService {
  lidaComIdentificacaoDaInstituicaoDeEnsino(vinculo: string): Importer
}
export class SessaoService implements ISessaoService {
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
