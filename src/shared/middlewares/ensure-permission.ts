import { AppError } from "@shared/error/AppError"
import { FastifyRequest } from "fastify"

function checkPermission(
  userPermissions: string[],
  requiredPermissions: string[],
) {
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission),
  )
}

export function ensurePermission(requiredPermissions: string[]) {
  return async (request: FastifyRequest) => {
    try {
      const user = request.user
      if (!user) {
        throw new AppError("User not authenticated.", 401)
      }

      const roles = user.roles
      if (!roles || !roles.permissions) {
        throw new AppError("Profile not found.", 404)
      }

      const { permissions } = roles.permissions as any

      if (!checkPermission(permissions, requiredPermissions)) {
        throw new AppError("User does not have permission.", 403)
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      } else {
        throw new AppError("Unexpected error during authorization.", 500)
      }
    }
  }
}
