import { Users, Tokens } from "@prisma/client"

import { IUsersCreateProps } from "../use-cases/users-create"
import { IUserUpdateProps } from "../use-cases/user-update"

export interface UsersRepository {
  getUser(user_id: string): Promise<Users | null>
  findByEmail(email: string): Promise<Users | null>
  createUsers(data: IUsersCreateProps, password: string): Promise<Users>
  updatePasswordAndDeleteToken(id: string, password: string): Promise<Users>
  updateUser(data: IUserUpdateProps, id: string): Promise<Users>
  findById(id: string): Promise<Users | null>
  getUserToken(token: string): Promise<Tokens | null>
  getUserTokenById(id: string): Promise<Tokens | null>
  saveTokenInDb(token: string, id_user: string): Promise<void>
}
