"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportarErrorAoSistema = void 0;
class ReportarErrorAoSistema extends Error {
    constructor(message, maisInformacoesSobreOErro) {
        super(message);
        this.name = 'ReportarErrorAoSistema';
        if (maisInformacoesSobreOErro) {
            this.stack += `\nMais Informações: ${JSON.stringify(maisInformacoesSobreOErro)}`;
        }
    }
}
exports.ReportarErrorAoSistema = ReportarErrorAoSistema;
