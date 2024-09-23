"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplinaService = void 0;
const ufcg_eureca_importer_1 = require("../importers/implementation/ufcg-eureca-importer");
class DisciplinaService {
    constructor(disciplinaRepository) {
        this.disciplinaRepository = disciplinaRepository;
    }
    //   async lidaComImportacaoDasDisciplinasDoDiscente(sessionDTO: SessionDTO, importer: Importer) {
    //     if (!sessionDTO.matricula || !sessionDTO.senha) {
    //       throw new Error("Login, senha são obrigatórios")
    //     }
    //     const { matricula, senha, discenteId } = sessionDTO
    //     // const disciplinasImportadas = await importer.importaDisciplinas(discenteId!, matricula, senha)
    //     // console.log(`importUserData: ${JSON.stringify(disciplinasImportadas, null, 2)}`)
    //     // const countDisciplinasCriadas = await this.disciplinaRepository.saveDisciplinas(disciplinasImportadas)
    //     // return countDisciplinasCriadas
    // }
    switchImporter(vinculo) {
        switch (vinculo) {
            case "UFCG":
                return new ufcg_eureca_importer_1.EurecaImporter();
            default:
                throw new Error("Importer error");
        }
    }
}
exports.DisciplinaService = DisciplinaService;
