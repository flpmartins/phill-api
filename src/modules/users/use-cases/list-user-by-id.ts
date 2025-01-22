import { UsersRepository } from "../repositories/users-repository"

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(user_id: string) {
    const user = await this.usersRepository.getUser(user_id)

    return user
  }
}
