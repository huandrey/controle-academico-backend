import { Curso, User } from "@prisma/client";

export type DiscenteDTO = {
  nome: string
  matricula: string
  userId: number
  cursoId: number
};
