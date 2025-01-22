import { AppError } from "@shared/error/AppError"

export const ensureAuthentication = async (request: any) => {
  try {
    await request.jwtVerify()
  } catch (error) {
    throw new AppError("Token de autenticação inválido.", 401)
  }
}
