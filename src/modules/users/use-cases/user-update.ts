import { UsersRepository } from "../repositories/users-repository"
import { AppError } from "@shared/error/AppError"

export interface IUserUpdateProps {
  name?: string
  email?: string
  avatar?: string
  phone?: string
  cpf?: string
  id_profile?: string
}
export class UserUpdateUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(data: IUserUpdateProps, id: string) {
    const userAlreadyExists = await this.usersRepository.findById(id)

    if (!userAlreadyExists) {
      throw new AppError("User not found")
    }
    const user = await this.usersRepository.updateUser(data, id)

    return user
  }
}
