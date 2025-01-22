import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"

import { UsersCreateUseCase } from "../users-create"

export function makeUsersCreateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()

  const usersCreateUseCase = new UsersCreateUseCase(prismaUsersRepository)

  return usersCreateUseCase
}
