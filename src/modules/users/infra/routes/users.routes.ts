import { FastifyInstance } from "fastify"

import {
  createUser,
  getUserById,
  updateAvatarUser,
  updateUser,
} from "../controllers/users.controller"

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", createUser)
  app.get("/:user_id", getUserById)
  app.post("/:id", updateAvatarUser)
  app.put("/:id", updateUser)
}
