import { Role } from "@prisma/client"

export type UserDTO = {
  nome: string
  role: Role
}
