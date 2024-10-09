import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import * as cheerio from 'cheerio'
import he from 'he'
import { Importer } from '../importer'
import { Disciplina, SituacaoDisciplina } from '@prisma/client'
import iconv from 'iconv-lite';

const urlSearchParams: AxiosRequestConfig<URLSearchParams> = {
  timeout: 10000,
  withCredentials: true,
  validateStatus: () => true,
  httpsAgent: new (require('https').Agent)({
    rejectUnauthorized: false
  }),
  responseType: 'arraybuffer',
  responseEncoding: 'binary',
}

export interface DisciplinaHistoricoProps {
  alunoId: number;
  codigo: string;
  nome: string;
  creditos: number;
  cargaHoraria: number;
  quantidadeProvas: number;
  quantidadeFaltas: number;
  semestre: string;
  mediaFinal: number | null;
  situacao: SituacaoDisciplina;
  docente: string;
  horario?: string;
}

export class UFCGImporter implements Importer {
  private disciplinas: DisciplinaHistoricoProps[] = []
  private codigos: string[] = []
  private cookies: string[] = []
  private URL_BASE = "https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/Controlador"
  private URL_LOGIN = this.URL_BASE
  private LOGIN = "login"
  private SENHA = "senha"
  private COMMAND = "command"
  private ALUNO_LOGIN = "AlunoLogin"

  private REPROVADO_POR_FALTA = "Reprovado por Falta"
  private TRANCADO = "Trancado"
  private DISPENSA = "Dispensa"
  private APROVADO = "Aprovado"
  private REPROVADO = "Reprovado"
  private ERRO_AUTENTICACAO = "ERRO NA AUTENTICAÇÃO"
  public static readonly ERRO = "Matrícula inválida ou senha incorreta."

  reportProgress(message: string): void {
    console.log(message) // Implement your progress reporting logic here
  }

  private cleanText = (text: string): string => {
    return he.decode(text) // Decodifica entidades HTML
      .replace(/\s+/g, ' ')
      .trim() // Remove espaços em branco no início e no final
  }

  public async autenticaAluno(matricula: string, senha: string): Promise<cheerio.CheerioAPI | undefined> {
    this.reportProgress("Tentando fazer login...")

    try {
      const response = await axios.post(this.URL_LOGIN, new URLSearchParams({
        [this.LOGIN]: matricula,
        [this.SENHA]: senha,
        [this.COMMAND]: this.ALUNO_LOGIN
      }), urlSearchParams)

      this.cookies = response.headers['set-cookie']!
      let html = iconv.decode(Buffer.from(response.data), 'ISO-8859-1')
      html = html.replace(/<meta[^>]*charset=["']?[^"'>]+["']?[^>]*>/i, '<meta charset="UTF-8">')

      const loadedDocument = cheerio.load(html)

      if (loadedDocument('head').text().includes(this.ERRO_AUTENTICACAO) || loadedDocument('body').text().includes(UFCGImporter.ERRO)) {
        throw new Error("Authentication Failed")
      }

      console.log(loadedDocument)
      return loadedDocument
    } catch (err) {
      console.error(err)
    }
  }

  public async obterDisciplinasDoHistoricoAcademico(alunoId: number): Promise<DisciplinaHistoricoProps[]> {
    this.reportProgress("Obtendo histórico...")
    try {
      const historicoResponse = await axios.get(this.URL_LOGIN, {
        params: { [this.COMMAND]: "AlunoHistorico" },
        headers: { Cookie: this.cookies.join(' ') },
        timeout: 10000,
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false
        }),
        responseType: 'arraybuffer', // Receber os dados como array buffer
        responseEncoding: 'binary',
      })

      const loadedHistoricoDocument = this.carregaHtml(historicoResponse)
      const trsDisciplinas = loadedHistoricoDocument("div[id=disciplinas] > table > tbody > tr").toArray()

      for (const el of trsDisciplinas) {
        const tds = loadedHistoricoDocument(el).find("td")
        const disciplina: DisciplinaHistoricoProps = this.montaDisciplina(tds, alunoId)
        this.disciplinas.push(disciplina)
        this.codigos.push(tds.eq(0).text() || '')
      }

      if (this.disciplinas.length === 0) {
        throw new Error("Você não possui histórico acadêmico")
      }

      return this.disciplinas
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error("Não foi possível buscar os dados. Tente novamente.")
        } else if (error.message.includes('ENOTFOUND')) {
          throw new Error("Não foi possível acessar o site da Universidade. Você está conectado a internet?")
        } else if (error.message.includes('UNABLE_TO_VERIFY_LEAF_SIGNATURE')) {
          throw new Error("Não foi possível acessar o site. Tente novamente")
        }
      }
      throw new Error(error.message)
    }
  }

  public async obterDetalhesDaDisciplina(): Promise<DisciplinaHistoricoProps[] | undefined> {
    this.reportProgress("Obtendo detalhes das disciplinas...")

    try {
      const horarioResponse = await axios.get(this.URL_BASE, {
        params: { [this.COMMAND]: "AlunoTurmasListar" },
        headers: { Cookie: this.cookies.join(' ') },
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false
        }),
        responseType: 'arraybuffer', // Receber os dados como array buffer
        responseEncoding: 'binary',
      })

      let htmlHorarioResponse = iconv.decode(Buffer.from(horarioResponse.data), 'ISO-8859-1');
      htmlHorarioResponse = htmlHorarioResponse.replace(/<meta[^>]*charset=["']?[^"'>]+["']?[^>]*>/i, '<meta charset="UTF-8">');

      const loadedHorarioDocument = this.carregaHtml(horarioResponse)
      const table = loadedHorarioDocument("table")

      if (table) {
        const trs = table.find("tr")
        trs.each((index, element) => {
          if (index === 0) return // Skip header row

          const tds = loadedHorarioDocument(element).children()
          const disciplina = this.deParaDisciplinaPorCodigo(tds.eq(1).text() || '')

          if (disciplina) {
            disciplina.horario = `Turma: ${tds.eq(3).text()}\nHorário: ${tds.eq(4).text()}`
          }
        })
      }

      return this.disciplinas
    } catch (err) {
      console.error(err)
    }
  }

  private carregaHtml(response: AxiosResponse<any, any>): cheerio.CheerioAPI {
    let htmlFormatado = iconv.decode(Buffer.from(response.data), 'ISO-8859-1');
    htmlFormatado = htmlFormatado.replace(/<meta[^>]*charset=["']?[^"'>]+["']?[^>]*>/i, '<meta charset="UTF-8">');
    const loadedDocument = cheerio.load(htmlFormatado) // Carregando o HTML
    return loadedDocument
  }

  private deParaDisciplinaPorCodigo(codigo: string): DisciplinaHistoricoProps | undefined {
    const disciplinasFind = this.disciplinas.filter((disciplina, index) => this.codigos[index] === codigo)

    return disciplinasFind.reduce((latest, disciplina) => {
      return (!latest || disciplina.semestre > latest.semestre) ? disciplina : latest
    }, undefined as DisciplinaHistoricoProps | undefined)
  }

  private montaDisciplina(tds: any, alunoId: number): DisciplinaHistoricoProps {
    const disciplina: DisciplinaHistoricoProps = {
      alunoId,
      codigo: tds.eq(0).text() || '',
      nome: this.cleanText(tds.eq(1).text()) || '',
      creditos: parseInt(tds.eq(3).text() || '0', 10),
      cargaHoraria: parseInt(tds.eq(4).text() || '0', 10),
      quantidadeProvas: this.calcularQuantidadeNotasPorCreditosDaDisciplina(tds.eq(3).text()),
      quantidadeFaltas: this.calcularQuantidadeFaltasPorCreditosDaDisciplina(tds.eq(3).text()),
      semestre: tds.eq(7).text() || '',
      mediaFinal: isNaN(parseFloat(tds.eq(5).text().replace(",", "."))) ? null : parseFloat(tds.eq(5).text().replace(",", ".")),
      situacao: this.definirSituacaoDisciplina(tds.eq(6).text(), parseFloat(tds.eq(5).text().replace(",", "."))),
      docente: 'Ausente',
    }

    return disciplina
  }

  private definirSituacaoDisciplina(situacao: string, mediaFinal: number | null): SituacaoDisciplina {
    let status: SituacaoDisciplina;

    switch (situacao) {
      case this.APROVADO:
      case this.DISPENSA:
        status = SituacaoDisciplina.DISPENSA;
        if (mediaFinal === null) {
          mediaFinal = 7.0;
        }
        break;
      case this.REPROVADO:
        status = SituacaoDisciplina.REPROVADO;
        break;
      case this.REPROVADO_POR_FALTA:
        status = SituacaoDisciplina.REPROVADO_POR_FALTA;
        mediaFinal = 0;
        break;
      case this.TRANCADO:
        status = SituacaoDisciplina.TRANCADA;
        break;
      default:
        status = SituacaoDisciplina.EM_PROGRESSO;
        break;
    }

    return status;
  }

  private calcularQuantidadeNotasPorCreditosDaDisciplina(creditos: string): number {
    const creditosDisciplina = parseInt(creditos || '0', 10)

    switch (creditosDisciplina) {
      case 1:
      case 2:
      case 3:
        return 2
      case 4:
        return 3
      case 5:
      case 6:
        return 4
      default:
        return 1
    }
  }

  private calcularQuantidadeFaltasPorCreditosDaDisciplina(creditos: string): number {
    const creditosDisciplina = parseInt(creditos || '0', 10)

    switch (creditosDisciplina) {
      case 1:
      case 2:
      case 3:
        return 4
      case 4:
        return 5
      case 5:
      case 6:
        return 6
      default:
        return 3
    }
  }
}
