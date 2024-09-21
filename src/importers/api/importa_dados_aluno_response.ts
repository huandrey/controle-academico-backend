export interface ImportaDadosAlunoResponse {
  nome: string
  matricula: string
  nome_do_curso: string
  turno_do_curso: string
  nome_do_campus: string
  codigo_do_setor: string
  nome_do_setor: string
  password: string
  historicoMatricula: HistoricoMatricula[]
}

interface HistoricoMatricula {
  matricula_do_estudante: string
  codigo_da_disciplina: string
  nome_da_disciplina: string
  periodo: number
  turma: number
  status: string
  tipo: string
  media_final: string
  dispensas: string
}
