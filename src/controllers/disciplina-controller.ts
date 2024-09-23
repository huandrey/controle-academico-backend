//   constructor(private userService: IUserService) {}

import { Request, Response } from "express";
import { IDisciplinaService } from "../services/disciplina-service";

export class DisciplinaController {
  private disciplinaService: IDisciplinaService
  
  constructor(disciplinaService: IDisciplinaService) {
    this.disciplinaService = disciplinaService
  }

  public async criaDisciplina(req: Request, res: Response): Promise<void> {
    res.status(201).json({ message: "Aluno criado com sucesso!" })
  }

  public async atualizaDisciplina(req: Request, res: Response): Promise<void> {

  }

  public async deletaDisciplina(req: Request, res: Response): Promise<void> {

  }

  public async importaDisciplinas(req: Request, res: Response): Promise<void> {}
}
