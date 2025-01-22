import { UsersRepository } from "../repositories/users-repository"
import { AppError } from "@shared/error/AppError"
import { v4 as uuid } from "uuid"
import { generateHashPassword } from "@shared/helpers/encrypt"
import { env } from "@shared/env"
import { welcomeEmail } from "@shared/helpers/mail/templates/welcomeEmail"
import { MailProvider } from "@shared/helpers/mail"

export interface IUsersCreateProps {
  name: string
  email: string
  avatar: string | null
  phone: string
  cpf: string
  id_profile: string
}

export class UsersCreateUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(data: IUsersCreateProps) {
    const mailProvider = new MailProvider()

    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)
    if (userAlreadyExists) {
      throw new AppError("User already exists")
    }

    const hashedPassword = await generateHashPassword(uuid())

    const token = uuid()

    if (data.id_profile !== "admin") {
      const user = await this.usersRepository.createUsers(data, hashedPassword)

      await this.usersRepository.saveTokenInDb(token, user.id)

      const resetPasswordLink = `${env.FRONTEND_URL}/reset-password/${token}`
      const html = welcomeEmail(user.name, resetPasswordLink)

      await mailProvider.sendMail({
        to: data.email,
        subject: "Bem-vindo ao template!",
        template: html,
      })

      return user
    }
  }
}
