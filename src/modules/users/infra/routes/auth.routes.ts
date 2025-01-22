import { FastifyInstance } from "fastify"
import { login } from "../controllers/auth.controller"

export async function authRoutes(app: FastifyInstance) {
  app.post("/", login)
}
