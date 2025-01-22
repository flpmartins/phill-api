import { UsersRepository } from "../repositories/users-repository"
import { AppError } from "@shared/error/AppError"
import { MailProvider } from "@shared/helpers/mail"
import { v4 as uuid } from "uuid"
import { passwordRecovery } from "@shared/helpers/mail/templates/passwordRecovery"
import { env } from "@shared/env"

export class ForgetPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("User not found", 400)
    }

    const mailProvider = new MailProvider()

    const token = uuid()

    const html = passwordRecovery(`${env.FRONTEND_URL}reset-password/${token}`)

    await this.usersRepository.saveTokenInDb(token, user.id)

    return mailProvider.sendMail({
      to: email,
      subject: "Recuperar senha ANÁLISA",
      template: html,
    })
  }
}
