import { IDatabase } from './database-interface';
import { AlunoDTO } from '../dtos/aluno-dto';
import { UserDTO } from '../dtos/user-dto';
import { User, Aluno, Disciplina } from "@prisma/client";

// Fake database implementation
export class FakeDatabase implements IDatabase {
  private tokens: Map<number, string>;

  constructor() {
    this.tokens = new Map<number, string>();
  }
  criaUsuario(data: UserDTO): Promise<User> {
    throw new Error("Method not implemented.");
  }
  buscaUsuarioPorId(id: number): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  buscaUsuarioPorEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  atualizaUsuario(id: number, data: Partial<UserDTO>): Promise<User> {
    throw new Error("Method not implemented.");
  }
  deletaUsuario(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  buscaPorUsuarios(): Promise<User[] | null> {
    throw new Error("Method not implemented.");
  }
  criaAluno(data: AlunoDTO): Promise<Aluno> {
    throw new Error("Method not implemented.");
  }
  atualizaAluno(id: number, data: Partial<AlunoDTO>): Promise<Aluno> {
    throw new Error("Method not implemented.");
  }
  deletaAluno(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  buscaAlunoPorId(id: number): Promise<Aluno | null> {
    throw new Error("Method not implemented.");
  }
  buscaAlunoPorMatricula(matricula: string): Promise<Aluno> {
    throw new Error("Method not implemented.");
  }
  buscaAlunoPorEmail(email: string): Promise<Aluno> {
    throw new Error("Method not implemented.");
  }
  autenticaUsuario(email: string, senha: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  salvaDisciplinas(data: Disciplina[]): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async adicionaTokenDeAutenticacao(userId: number, token: string): Promise<void> {
    // Simulando a adição do token no banco de dados
    this.tokens.set(userId, token);
  }

  getTokenByUserId(userId: number): string | undefined {
    return this.tokens.get(userId);
  }
}
