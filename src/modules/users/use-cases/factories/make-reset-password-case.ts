import { ResetPasswordCase } from "../reset-password"
import { PrismaUsersRepository } from "@modules/users/repositories/prisma/prisma-users-repository"

export function makeResetPasswordCase() {
  const prismaUsersRepository = new PrismaUsersRepository()

  const resetPasswordCase = new ResetPasswordCase(prismaUsersRepository)

  return resetPasswordCase
}
