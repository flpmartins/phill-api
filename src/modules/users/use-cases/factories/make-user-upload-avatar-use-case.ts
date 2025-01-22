import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { S3Provider } from "@shared/providers/S3Provider"
import { UserUpdateAvatarUseCase } from "../upload-avatar"

export function makeUserUpdateAvatarUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const s3Provider = new S3Provider()

  const userUpdateUseCase = new UserUpdateAvatarUseCase(
    prismaUsersRepository,
    s3Provider,
  )

  return userUpdateUseCase
}
