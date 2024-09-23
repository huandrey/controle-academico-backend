export class ReportarErrorAoSistema extends Error {
    constructor(message, maisInformacoesSobreOErro) {
        super(message);
        this.name = 'ReportarErrorAoSistema';
        if (maisInformacoesSobreOErro) {
            this.stack += `\nMais Informações: ${JSON.stringify(maisInformacoesSobreOErro)}`;
        }
    }
}
