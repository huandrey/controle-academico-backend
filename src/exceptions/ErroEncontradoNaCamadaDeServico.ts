class ErroEncontradoNaCamadaDeServico extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ErroEncontradoNaCamadaDeServico'
  }
}
