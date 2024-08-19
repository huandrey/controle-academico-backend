import { Discente } from "@prisma/client"
import { DiscenteDTO } from "../dtos/discente-dto"
import { IDatabase } from "../database/database-interface"

export interface IDiscenteRepository {
  criaDiscente(data: DiscenteDTO): Promise<Discente>
  atualizaDiscente(id: number, data: Partial<DiscenteDTO>): Promise<Discente | null>
  deletaDiscente(id: number): Promise<void>
  buscaDiscentePorId(id: number): Promise<Discente | null>
  buscaDiscentePorEmail(email: string): Promise<Discente | null>
}

export type AtualizaDiscenteDTO = {
  email?: string
  name?: string
  password?: string
  role?: string
}

export class DiscenteRepository implements IDiscenteRepository {
  private orm: IDatabase

  constructor(orm: IDatabase) {
    this.orm = orm
  }

  async criaDiscente(data: Discente): Promise<Discente> {
    return this.orm.criaDiscente(data)
  }

  async atualizaDiscente(id: number, data: DiscenteDTO): Promise<Discente | null> {
    return this.orm.atualizaDiscente(id, data)
  }

  async deletaDiscente(id: number): Promise<void> {
    await this.orm.deletaDiscente(id)
  }

  async buscaDiscentePorId(id: number): Promise<Discente | null> {
    return this.orm.buscaDiscentePorId(id)
  }

  async buscaDiscentePorMatricula(matricula: string): Promise<Discente | null> {
    return this.orm.buscaDiscentePorMatricula(matricula)
  }

  async buscaDiscentePorEmail(email: string): Promise<Discente | null> {
    return this.orm.buscaDiscentePorEmail(email)
  }
}
