import { S3Provider } from "@shared/providers/S3Provider"
import { UsersRepository } from "../repositories/users-repository"
import { AppError } from "@shared/error/AppError"

export class UserUpdateAvatarUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private s3Provider: S3Provider,
  ) {
    this.usersRepository = usersRepository
    this.s3Provider = s3Provider
  }

  async execute(key: string, file: any, id: string) {
    const userAlreadyExists = await this.usersRepository.findById(id)

    if (!userAlreadyExists) {
      throw new AppError("User not found")
    }

    const fileKey = `${key}`

    const fileUrl = await this.s3Provider.uploadFile({
      body: file.file,
      key: fileKey,
    })
    if (fileUrl) {
      const user = await this.usersRepository.updateUser(
        { avatar: String(fileUrl) },
        id,
      )

      return user
    }
  }
}
