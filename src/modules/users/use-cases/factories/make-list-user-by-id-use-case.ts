import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"

import { GetUserByIdUseCase } from "../list-user-by-id"

export function makeListUserByIdUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()

  const usersCreateUseCase = new GetUserByIdUseCase(prismaUsersRepository)

  return usersCreateUseCase
}
