import { IDisciplinaRepository } from "../repositories/disciplina-repository"

export interface IDisciplinaService {}

export class DisciplinaService implements IDisciplinaService {
  private disciplinaRepository: IDisciplinaRepository
  
  constructor(disciplinaRepository: IDisciplinaRepository) {
    this.disciplinaRepository = disciplinaRepository
  }
}
