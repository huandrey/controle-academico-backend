export class ReportarErrorAoSistema extends Error {
  constructor(message: string, maisInformacoesSobreOErro?: any) {
    super(message)
    this.name = 'ReportarErrorAoSistema'
    if (maisInformacoesSobreOErro) {
      this.stack += `\nMais Informações: ${JSON.stringify(maisInformacoesSobreOErro)}`
    }
  }
}
