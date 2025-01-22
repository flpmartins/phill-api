import { generateHashPassword } from "@shared/helpers/encrypt"

import { prisma } from "@config/prisma"

import { UsersRepository } from "../users-repository"

import { IUsersCreateProps } from "../../use-cases/users-create"
import { IUserUpdateProps } from "@modules/users/use-cases/user-update"

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    })

    return user
  }

  async createUsers(data: IUsersCreateProps, password: string) {
    const hashedPassword = await generateHashPassword(password)

    const user = await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        cpf: data.cpf || "",
        avatar: data.avatar || "",
        id_profile: data.id_profile,
        phone: data.phone,
      },
    })

    return user
  }

  async updatePasswordAndDeleteToken(id: string, password: string) {
    const user = await prisma.users.update({
      data: {
        password,
      },
      where: {
        id,
      },
    })

    if (id) {
      await prisma.tokens.deleteMany({
        where: {
          user_id: id,
        },
      })
    }

    return user
  }

  async getUserToken(token: string) {
    const userToken = await prisma.tokens.findFirst({
      where: {
        token,
      },
    })

    return userToken
  }

  async findById(id: string) {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async updateUser(data: IUserUpdateProps, id: string) {
    const user = await prisma.users.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        avatar: data.avatar,
        id_profile: data.id_profile,
        phone: data.phone,
      },
    })

    return user
  }

  async getUserTokenById(id: string) {
    const userToken = await prisma.tokens.findFirst({
      where: {
        user_id: id,
      },
    })

    return userToken
  }

  async getUser(user_id: string) {
    const user = await prisma.users.findUnique({
      where: { id: user_id },
    })
    return user
  }

  async saveTokenInDb(token: string, user_id: string) {
    await prisma.tokens.create({
      data: {
        token,
        user_id,
      },
    })
  }
}
