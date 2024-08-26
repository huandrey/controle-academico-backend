import axios from 'axios'
import * as cheerio from 'cheerio' // Importação correta
import he from 'he'
import { Importer } from '../importer'
import { Disciplina, DisciplinaStatus } from '@prisma/client'
import iconv from 'iconv-lite';

export class UFCGImporter implements Importer {
  private URL_BASE = "https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/Controlador"
  private URL_LOGIN = this.URL_BASE
  private LOGIN = "login"
  private SENHA = "senha"
  private COMMAND = "command"
  private ALUNO_LOGIN = "AlunoLogin"

  private REP_FALTA = "Reprovado por Falta"
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

  public async autenticaUsuario(matricula: string, senha: string): Promise<string[]> {
    this.reportProgress('Autenticando usuário...')
    try {
      const response = await axios.post(this.URL_LOGIN, new URLSearchParams({
        [this.LOGIN]: matricula,
        [this.SENHA]: senha,
        [this.COMMAND]: this.ALUNO_LOGIN
      }), {
        timeout: 10000,
        withCredentials: true,
        validateStatus: () => true,
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false
        }),
        responseType: 'arraybuffer', // Receber os dados como array buffer
        responseEncoding: 'binary',
      })
     
      const cookies: string[] = response.headers['set-cookie']!
      
      let html = iconv.decode(Buffer.from(response.data), 'ISO-8859-1')
      html = html.replace(/<meta[^>]*charset=["']?[^"'>]+["']?[^>]*>/i, '<meta charset="UTF-8">')

      const $ = cheerio.load(html) 

      if ($('head').text().includes(this.ERRO_AUTENTICACAO) || $('body').text().includes(UFCGImporter.ERRO)) {
        throw new Error("A autenticação do aluno falhou")
      }

      console.log($)

      return cookies
    } catch (error) {
      throw error
    }
  }

  public async buscaHistoricoDoDiscente(cookies: string[]) {
    this.reportProgress("Obtendo histórico...")
    try {
      const historicoResponse = await axios.get(this.URL_LOGIN, {
        params: { [this.COMMAND]: "AlunoHistorico" },
        headers: { Cookie: cookies.join(' ') },
        timeout: 10000,
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false
        }),
        responseType: 'arraybuffer', // Receber os dados como array buffer
        responseEncoding: 'binary',
      })

      let htmlHistoricoResponse = iconv.decode(Buffer.from(historicoResponse.data), 'ISO-8859-1')
      htmlHistoricoResponse = htmlHistoricoResponse.replace(/<meta[^>]*charset=["']?[^"'>]+["']?[^>]*>/i, '<meta charset="UTF-8">')
      const historico$ = cheerio.load(htmlHistoricoResponse)

      return historico$
    } catch (error) {
      throw error
    }
  } 

  public async buscaHorariosDasDisciplinas(cookies: string[], disciplinas: any, codigos: string[]) {
    this.reportProgress('Buscando informações das disciplinas')
    try {
      const horarioResponse = await axios.get(this.URL_BASE, {
        params: { [this.COMMAND]: "AlunoTurmasListar" },
        headers: { Cookie: cookies.join(' ') },
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false
        }),
        responseType: 'arraybuffer', // Receber os dados como array buffer
        responseEncoding: 'binary',
      })

      let htmlHorarioResponse = iconv.decode(Buffer.from(horarioResponse.data), 'ISO-8859-1');
      htmlHorarioResponse = htmlHorarioResponse.replace(/<meta[^>]*charset=["']?[^"'>]+["']?[^>]*>/i, '<meta charset="UTF-8">');
      
      const horario$ = cheerio.load(htmlHorarioResponse)
      const table = horario$("table")

      if (table) {
        const trs = table.find("tr")
        trs.each((index, element) => {
          if (index === 0) return // Skip header row
          
          const tds = horario$(element).children()
          const disciplina = this.findDisciplina(disciplinas, codigos, tds.eq(1).text() || '')

          if (disciplina) {
            disciplina.horario = `Turma: ${tds.eq(3).text()}\nHorário: ${tds.eq(4).text()}`
          }
        })
      }

      return disciplinas
    } catch (error) {
      throw error
    }
  }

  public async montaDisciplinaEBuscaInformacoes(cookies: string[], historicoHtml$: cheerio.CheerioAPI, discenteId: number) {
    const disciplinas: any = []
    const codigos: string[] = []
    const trsDisciplinas = historicoHtml$("div[id=disciplinas] > table > tbody > tr").toArray()

    for (const el of trsDisciplinas) {
      const tds = historicoHtml$(el).find("td")
      const disciplina = {
        codigo: tds.eq(0).text() || '',
        nome: this.cleanText(tds.eq(1).text()) || '',
        creditos: parseInt(tds.eq(3).text() || '0', 10),
        quantidadeProvas: this.calcularQtdeNotas(parseInt(tds.eq(3).text() || '0', 10)),
        quantidadeFaltas: this.calcularQtdeFaltas(parseInt(tds.eq(3).text() || '0', 10)),
        semestre: tds.eq(7).text() || '',
        mediaFinal: isNaN(parseFloat(tds.eq(5).text().replace(",", "."))) ? null : parseFloat(tds.eq(5).text().replace(",", ".")),
        status: '',
        cursoId: 1,
        discenteId,
      }

      switch (tds.eq(6).text()) {
        case this.APROVADO:
        case this.DISPENSA:
          disciplina.status = DisciplinaStatus.APENAS_MEDIA_APROVADO
          if (disciplina.mediaFinal === null) {
            disciplina.mediaFinal = 7.0
          }
          break
        case this.REPROVADO:
          disciplina.status = DisciplinaStatus.APENAS_MEDIA_REPROVADO
          break
        case this.REP_FALTA:
          disciplina.status = DisciplinaStatus.REPROVADO_POR_FALTA
          disciplina.mediaFinal = 0
          break
        case this.TRANCADO:
          disciplina.status = DisciplinaStatus.TRANCADA
        default:
          disciplina.status = DisciplinaStatus.EM_PROGRESSO
          break
      }

      disciplinas.push(disciplina)
      codigos.push(tds.eq(0).text() || '')
    }

    if (disciplinas.length === 0) {
      throw new Error("Você não possui histórico acadêmico")
    }

    const disciplinasAtualizadas = await this.buscaHorariosDasDisciplinas(cookies, disciplinas, codigos)

    return disciplinasAtualizadas
  }

  public async importaDisciplinas(discenteId: number, matricula: string, senha: string): Promise<Disciplina[]> {
    try {
      const cookies: string[] = await this.autenticaUsuario(matricula, senha)
      const historicoHtml: cheerio.CheerioAPI | undefined = await this.buscaHistoricoDoDiscente(cookies)
      const disciplinas = await this.montaDisciplinaEBuscaInformacoes(cookies, historicoHtml!, discenteId)
      
      return disciplinas
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

  private findDisciplina(disciplinas: Disciplina[], codigos: string[], codigo: string): Disciplina | undefined {
    const disciplinasFind = disciplinas.filter((disciplina, index) => codigos[index] === codigo)

    return disciplinasFind.reduce((latest, disciplina) => {
      return (!latest || disciplina.semestre > latest.semestre) ? disciplina : latest
    }, undefined as Disciplina | undefined)
  }

  private calcularQtdeNotas(creditos: number): number {
    switch (creditos) {
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

  private calcularQtdeFaltas(creditos: number): number {
    switch (creditos) {
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
