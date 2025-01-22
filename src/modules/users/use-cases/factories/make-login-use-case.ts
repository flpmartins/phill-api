import { LoginUseCase } from '../login'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/prisma-users-repository'

export function makeLoginUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const loginUseCase = new LoginUseCase(prismaUsersRepository)

  return loginUseCase
}
