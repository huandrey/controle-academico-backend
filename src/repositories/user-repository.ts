import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export interface IUserRepository {
  saveDisciplinas(disciplinas: any): Promise<Prisma.BatchPayload>;
}

export class UserRepository implements IUserRepository {
  public async saveDisciplinas(disciplinas: any) {
    return await prisma.discipline.createMany({ data: disciplinas });
  }
}
