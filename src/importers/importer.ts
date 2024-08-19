import { Disciplina } from './implementation/ufcg-importer'
// src/importers/Importer.ts
export abstract class Importer {
  protected baseUrl: string
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  abstract login(login: string, senha: string, vinculo?: string): Promise<void>
  abstract importDisciplinas(login: string, senha: string, vinculo?: string): Promise<Disciplina[]>

  protected reportProgress(msg: string): void {
    console.log(msg)
  }
}
