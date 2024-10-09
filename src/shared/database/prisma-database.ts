// src/database/PrismaDatabase.tsimport { PrismaClient } from'@prisma/client'
import { Aluno, Disciplina, PrismaClient, Usuario } from '@prisma/client'
import { UsuarioDTO } from '../../features/usuarios/usuario-dto'
import { IDatabase } from './database-interface'
import { AlunoDTO } from '../../features/alunos/aluno-dto'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library'
import { DisciplinaHistoricoProps } from '../importers/implementation/ufcg-importer'

const prisma = new PrismaClient()

export class PrismaDatabase implements IDatabase {

  // Métodos de consulta e escrita do banco de dados para Usuário
  async salvaUsuario(data: UsuarioDTO): Promise<Usuario> {
    return prisma.usuario.create({
      data: {
        nome: data.nome,
        role: data.role,
      }
    })
  }

  async atualizaUsuario(id: number, data: Partial<UsuarioDTO>): Promise<Usuario> {
    return prisma.usuario.update({ where: { id }, data })
  }

  async adicionaTokenDeAutenticacaoAoUsuario(id: number, token: string): Promise<void> {
    await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        token
      }
    })
  }

  async buscaUsuarioPorId(id: number): Promise<Usuario | null> {
    return prisma.usuario.findUnique({ where: { id } })
  }

  buscaUsuarioPorEmail(email: string): Promise<Usuario | null> {
    throw new Error('Method not implemented.')
  }

  async buscaPorTodosUsuarios(): Promise<Usuario[] | null> {
    return await prisma.usuario.findMany()
  }

  async removeUsuario(id: number): Promise<void> {
    await prisma.usuario.delete({ where: { id } })
  }

  // Métodos de consulta e escrita do banco de dados para Aluno
  salvaAluno(data: AlunoDTO): Promise<Aluno> {
    const aluno = prisma.aluno.create({
      data: {
        nome: data.nome,
        matricula: data.matricula,
        usuario: {
          connect: {
            id: data.usuarioId,
          }
        },
      },
    })

    return aluno
  }

  atualizaAluno(id: number, data: Partial<AlunoDTO>): Promise<Aluno> {
    throw new Error('Method not implemented.')
  }

  buscaAlunoPorId(id: number): Promise<Aluno | null> {
    throw new Error('Method not implemented.')
  }

  buscaAlunoPorEmail(email: string): Promise<Aluno> {
    throw new Error('Method not implemented.')
  }

  buscaAlunoPorMatricula(matricula: string): Promise<Aluno> {
    throw new Error('Method not implemented.')
  }

  removeAluno(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }

  // Métodos de consulta e escrita do banco de dados para Disciplina
  async salvaVariasDisciplinas(data: DisciplinaHistoricoProps[]): Promise<number> {
    try {
      const disciplinas = await prisma.disciplina.createMany({
        data: [...data]
      })

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
}
