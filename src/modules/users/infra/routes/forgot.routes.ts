import { FastifyInstance } from "fastify"

import { forgotPassword } from "../controllers/forgot.controller"

export async function forgotRoutes(app: FastifyInstance) {
  app.post("/", forgotPassword)
}
