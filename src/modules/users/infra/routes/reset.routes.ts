import { FastifyInstance } from "fastify"
import { resetPassword } from "../controllers/reset.controller"

export async function resetRoutes(app: FastifyInstance) {
  app.patch("/:token", resetPassword)
}
