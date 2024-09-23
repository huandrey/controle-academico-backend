import { EurecaImporter } from "../importers/implementation/ufcg-eureca-importer";
export class SistemaService {
    lidaComIdentificacaoDaInstituicaoDeEnsino(vinculo) {
        return this.switchImporter(vinculo);
    }
    autenticaUsuarioDeAcordoComInstituicao(matricula, password, instituicao) {
        // instituicao.autenticaUsuario(matricula, password)
    }
    buscaTokenDoUsuarioNaRPE(matricula, senha, instituicao) {
        return instituicao.buscaTokenDoUsuarioNaRPE(matricula, senha);
    }
    importaDadosDoAluno(matricula, senha, token, instituicao) {
        return instituicao.importaDadosDoAluno(matricula, senha, token);
    }
    switchImporter(vinculo) {
        switch (vinculo) {
            case "UFCG":
                return new EurecaImporter();
            default:
                throw new Error("Importer error");
        }
    }
}
