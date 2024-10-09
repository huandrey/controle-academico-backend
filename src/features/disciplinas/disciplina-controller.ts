//   constructor(private userService: IUserService) {}

import { Request, Response } from "express";
import { IDisciplinaService } from "./disciplina-service";

//   async importUserData(req: Request, res: Response) {
//     const { login, senha, vinculo } = req.body
//     try {
//       const data = await this.userService.importUserData(login, senha, vinculo)
//       res.status(200).json(data)
//     } catch (error: any) {
//       console.log(error)
//       res.status(500).json({ message: error.message })
//     }
//   }

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

  public async importaDisciplinas(req: Request, res: Response): Promise<void> { }
}

//   toString() {
//     return 'UserController'
//   }
// }
