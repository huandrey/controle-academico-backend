import axios from 'axios'
import { Importer } from '../importer'
import { DisciplinaDTO } from '../../dtos/disciplina-dto'
import { ImportaDadosAlunoResponse } from '../api/importa_dados_aluno_response'

export class EurecaImporter implements Importer {
  private URL_PARA_OBTER_TOKEN_DE_ACESSO = "https://eureca.sti.ufcg.edu.br/as/tokens"
  private URL_BASE_EURECA = 'https://eureca.sti.ufcg.edu.br/das/v2';
  private URL_DADOS_ALUNO = "/estudantes/historico/estudante"

  public static readonly ERRO = "Matrícula inválida ou senha incorreta."

  public static readonly ERRO_NA_OBTENCAO_DO_TOKEN = "Matrícula inválida ou senha incorreta."
  public static readonly ERRO_NA_OBTENCAO_DO_TOKEN_DADOS_VAZIO = "Retorno da API vazio."

  reportProgress(message: string): void {
    console.log(message) // Implement your progress reporting logic here
  }

  public async buscaTokenDoUsuarioNaRPE(matricula: string, senha: string) {
    const username = matricula?.trim()
    const password = senha?.trim()
    
    if (!username ||!password) {
      throw new Error('Matrícula ou senha não podem estar em branco.')
    }
    
    this.reportProgress('Buscando token do usuário na RPE...')
    try {
      const response = await axios.post(this.URL_PARA_OBTER_TOKEN_DE_ACESSO, {
        credentials: {
          username,
          password,
        }
      })

      this.reportProgress('Token obtido com sucesso!')
      
      if (!response.data || !response.data.token) {
        throw new Error(EurecaImporter.ERRO_NA_OBTENCAO_DO_TOKEN_DADOS_VAZIO)
      }

      return response.data.token
    } catch (error) {
      console.error(error)
      throw new Error(EurecaImporter.ERRO_NA_OBTENCAO_DO_TOKEN)
    }
  }

  public async importaDadosDoAluno(matricula: string, senha: string, token: string): Promise<ImportaDadosAlunoResponse> {
    this.reportProgress('Importando dados do aluno...')
    try {
      const response = await axios.get(`${this.URL_BASE_EURECA + this.URL_DADOS_ALUNO}?estudante=${matricula}`, {
        headers: {
          'accept': 'application/json',
          'Connection': 'keep-alive',
          'token-de-autenticacao': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMjAxMTA1NzMiLCJjb2RlIjoiMTQxMDIxMDAiLCJpc3MiOiIiLCJuYW1lIjoiSFVBTkRSRVkgREUgU09VWkEgUE9OVEVTIiwiZXhwIjoiMTcyNjk1ODcwMTY5MyIsInR5cGUiOiJBbHVubyIsImVtYWlsIjoiaHVhbmRyZXkucG9udGVzQGNjYy51ZmNnLmVkdS5iciJ9.bJJ2SoVbckSR2hU3WK0cS1qCZEMhadkV0v3iIpB7BHB577rVIoK-qHykR0dRRIFLKQGZTkTVumoHnDrwztlPNYiXGHiA0UxyZbopfdjl5KCpdfZZU3etWpqHjsaKuNf-i7AH2Dhi3A6ISToSpAf9cdd7nwsY7NSA6UoqK7b8OuSUg9uDVceto9X4RAy3PkLocL3c3UA5ljbi5nehAxwHmX-f9x1YePP5TqsWQNAbvNStXHlhg0VeY_N7pJVIhDaH5ntOjBCmb4Sy7qMYDQgruu7wSqK09TyNZPukDHH7yTh7tX225dYXHKed2KAhwA4x6WJbD2H9dxwJNUBkq2KK8g=='
        }
      })

      const { 
        nome, codigo_do_curso, nome_do_curso, turno_do_curso, 
        codigo_do_curriculo, campus, nome_do_campus, codigo_do_setor, 
        nome_do_setor, estado_civil, endereco, genero, data_de_nascimento,
        cpf, cep, telefone, situacao, forma_de_ingresso, periodo_de_ingresso, 
        email, nacionalidade, local_de_nascimento, naturalidade, cor, 
        creditos_do_cra, notas_acumuladas, periodos_completados, 
        creditos_tentados, creditos_completados, creditos_isentos, 
        creditos_falhados, creditos_suspensos, creditos_em_andamento, 
        velocidade_media, taxa_de_sucesso, historico_de_matriculas
    } = response.data

      const historico = response.data.historico_de_matriculas.map((disciplina: DisciplinaDTO) => ({
        matriculaDoEstudante: disciplina.matricula_do_estudante,
        disciplina: {
          codigoDaDisciplina: disciplina.codigo_da_disciplina,
          nomeDaDisciplina: disciplina.nome_da_disciplina,
          periodo: disciplina.periodo,
          turma: disciplina.turma,
          status: disciplina.status,
          tipo: disciplina.tipo,
          mediaFinal: disciplina.media_final,
          dispensas: disciplina.dispensas
        }
      }));

    const aluno = {
      nome,
      matricula,
      nome_do_curso,
      turno_do_curso,
      nome_do_campus,
      codigo_do_setor,
      nome_do_setor,
      password: senha,
      historicoMatricula: [...historico]
    }

    return aluno

    }  catch (err) {
      console.error(err);
      throw new Error('Erro ao importar dados do aluno');
   }
  }
}
