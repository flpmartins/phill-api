import { UsersRepository } from "../repositories/users-repository"
import { AppError } from "@shared/error/AppError"
import { generateHashPassword } from "../../../shared/helpers/encrypt"

interface IResetRequest {
  token: string
  password: string
}

export class ResetPasswordCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(data: IResetRequest) {
    const userToken = await this.usersRepository.getUserToken(data.token)
    if (!userToken) {
      throw new AppError("Invalid or expired token")
    }

    const passwordHashed = await generateHashPassword(data.password)

    const reset = {
      userId: userToken.user_id,
      password: passwordHashed,
    }

    const result = await this.usersRepository.updatePasswordAndDeleteToken(
      reset.userId,
      reset.password,
    )

    return result
  }
}
