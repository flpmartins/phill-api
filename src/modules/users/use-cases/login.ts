import { AppError } from "@shared/error/AppError"
import { compareHashPasswords } from "@shared/helpers/encrypt"
import { UsersRepository } from "../repositories/users-repository"
import { IUser } from "@shared/dtos"

interface IProps {
  email: string
  password: string
}

export class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }: IProps): Promise<IUser> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Usuário não encontrado", 400)
    }

    if (!user.id_profile) {
      throw new AppError("Perfil não encontrado", 400)
    }

    if (user.password) {
      const isPasswordMatch = await compareHashPasswords(
        password,
        user.password,
      )
      if (!isPasswordMatch) {
        throw new AppError("Credenciais inválidas", 401)
      }
    } else {
      throw new AppError("Credenciais inválidas", 401)
    }

    return user
  }
}
