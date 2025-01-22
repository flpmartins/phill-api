import { ForgetPasswordUseCase } from "../forgot-password"
import { PrismaUsersRepository } from "@modules/users/repositories/prisma/prisma-users-repository"

export function makeForgotPasswordUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const forgetPasswordUseCase = new ForgetPasswordUseCase(prismaUsersRepository)

  return forgetPasswordUseCase
}
