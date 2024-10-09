import { Role } from "@prisma/client"

export type UsuarioDTO = {
  nome: string
  role?: Role
}
