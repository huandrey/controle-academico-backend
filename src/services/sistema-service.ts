import { ImportaDadosAlunoResponse } from "../importers/api/importa_dados_aluno_response"
import { EurecaImporter } from "../importers/implementation/ufcg-eureca-importer"
// import { UFCGImporter } from "../importers/implementation/ufcg-importer"
import { Importer } from "../importers/importer"

export interface ISistemaService {
  // lidaComIdentificacaoDaInstituicaoDeEnsino(vinculo: string): Importer
}
export class SistemaService implements ISistemaService {
  lidaComIdentificacaoDaInstituicaoDeEnsino(vinculo: string) {
    return this.switchImporter(vinculo)
  }

  autenticaUsuarioDeAcordoComInstituicao(matricula: string, password: string, instituicao: Importer) {
    // instituicao.autenticaUsuario(matricula, password)
  }

  buscaTokenDoUsuarioNaRPE(matricula: string, senha: string, instituicao: Importer): Promise<string> {
    return instituicao.buscaTokenDoUsuarioNaRPE(matricula, senha)
  }

  importaDadosDoAluno(matricula: string, senha: string, token: string, instituicao: Importer): Promise<ImportaDadosAlunoResponse> {
    return instituicao.importaDadosDoAluno(matricula, senha, token)
  }
  switchImporter(vinculo: string): Importer {
    switch (vinculo) {
      case "UFCG":
        return new EurecaImporter()
      default:
        throw new Error("Importer error")
    }
  }
}
