// src/database/PrismaDatabase.tsimport { PrismaClient } from'@prisma/client'
import { Aluno, Disciplina, PrismaClient, User } from '@prisma/client'
import { UserDTO } from '../dtos/user-dto'
import { IDatabase } from'./database-interface'
import { AlunoDTO } from '../dtos/aluno-dto'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library'

const prisma = new PrismaClient()

export class PrismaDatabase implements IDatabase {
  async salvaDisciplinas(data: Disciplina[]): Promise<number> {
    try {
      const disciplinas = await prisma.disciplina.createMany({ data })
  
      return disciplinas.count
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        console.error('Erro ao inicializar o Prisma Client:', error.message)
      } else {
        console.error('Erro desconhecido ao salvar disciplinas:', error)
      }
      throw error
    }
  }

  async buscaPorUsuarios(): Promise<User[] | null> {
    return await prisma.user.findMany()
  }
  
  async adicionaTokenDeAutenticacao(id: number, token: string): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        token
      }
    })
  }
  buscaUsuarioPorEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
  atualizaAluno(id: number, data: Partial<AlunoDTO>): Promise<Aluno> {
    throw new Error('Method not implemented.')
  }
  deletaAluno(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
  buscaAlunoPorId(id: number): Promise<Aluno | null> {
    throw new Error('Method not implemented.')
  }
  buscaAlunoPorMatricula(matricula: string): Promise<Aluno> {
    throw new Error('Method not implemented.')
  }
  buscaAlunoPorEmail(email: string): Promise<Aluno> {
    throw new Error('Method not implemented.')
  }
  criaAluno(data: AlunoDTO): Promise<Aluno> {
    console.log(data)
    const aluno = prisma.aluno.create({ 
      data: {
        nome: data.nome,
        matricula: data.matricula,
        user: {
          connect: {
            id: data.userId,
          }
        },
        curso: {
          connect: {
            id: data.cursoId,
          }
        }
      },
    })

    return aluno
  }

  async criaUsuario(data: UserDTO): Promise<User> {
    return prisma.user.create({ data: {
      nome: data.nome,
      role: data.role,
    }})
  }

  async buscaUsuarioPorId(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } })
  }

  async atualizaUsuario(id: number, data: Partial<UserDTO>): Promise<User> {
    return prisma.user.update({ where: { id }, data })
  }

  async deletaUsuario(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } })
  }

  async autenticaUsuario(email: string, password: string): Promise<User | null> {
    return null
  }

  async validaToken(token: string): Promise<boolean> {
    return true
  }
}
