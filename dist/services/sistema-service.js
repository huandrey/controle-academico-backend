"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaService = void 0;
const ufcg_eureca_importer_1 = require("../importers/implementation/ufcg-eureca-importer");
class SistemaService {
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
                return new ufcg_eureca_importer_1.EurecaImporter();
            default:
                throw new Error("Importer error");
        }
    }
}
exports.SistemaService = SistemaService;
