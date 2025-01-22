import { env } from "../../env"
import bcrypt from "bcrypt"

export async function generateHashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, env.SALT_RESULT)
}

export async function compareHashPasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}
