import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"

import { UserUpdateUseCase } from "../user-update"

export function makeUserUpdateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()

  const userUpdateUseCase = new UserUpdateUseCase(prismaUsersRepository)

  return userUpdateUseCase
}
