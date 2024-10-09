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
  async salvaUsuario(usuarioDTO: UsuarioDTO): Promise<Usuario> {
    return await prisma.usuario.create({ data: { ...usuarioDTO } })
  }

  async atualizaUsuario(id: number, data: Partial<UsuarioDTO>): Promise<Usuario> {
    return await prisma.usuario.update({ where: { id }, data })
  }

  async adicionaTokenDeAutenticacaoAoUsuario(id: number, token: string): Promise<void> {
    await prisma.usuario.update({ where: { id }, data: { token } })
  }

  async buscaUsuarioPorId(id: number): Promise<Usuario | null> {
    return await prisma.usuario.findUnique({ where: { id } })
  }

  async buscaPorTodosUsuarios(): Promise<Usuario[] | null> {
    return await prisma.usuario.findMany()
  }

  async removeUsuario(id: number): Promise<void> {
    await prisma.usuario.delete({ where: { id } })
  }

  // Métodos de consulta e escrita do banco de dados para Aluno
  async salvaAluno(data: AlunoDTO): Promise<Aluno> {
    const aluno = await prisma.aluno.create({
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

  async atualizaAluno(id: number, data: Partial<AlunoDTO>): Promise<Aluno> {
    return await prisma.aluno.update({ where: { id }, data })
  }

  async buscaAlunoPorId(id: number): Promise<Aluno | null> {
    return await prisma.aluno.findUnique({ where: { id } })
  }

  async buscaInformacoesDoAlunoPorId(id: number): Promise<Omit<Aluno, 'usuarioId'> | null> {
    return await prisma.aluno.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nome: true,
        matricula: true,
        universidade: true,
        curso: true,
        historicoAcademico: true,
        createdAt: true,
        updatedAt: true,
      }
    })
  }


  async buscaAlunoPorMatricula(matricula: string): Promise<Aluno | null> {
    return await prisma.aluno.findUnique({ where: { matricula } })
  }

  async removeAluno(id: number) {
    await prisma.aluno.delete({ where: { id } })
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
