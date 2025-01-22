import { FastifyInstance } from "fastify"

import { authRoutes } from "@modules/users/infra/routes/auth.routes"
import { usersRoutes } from "@modules/users/infra/routes/users.routes"
import { forgotRoutes } from "@modules/users/infra/routes/forgot.routes"
import { resetRoutes } from "@modules/users/infra/routes/reset.routes"
import { productsRoutes } from "@modules/products/infra/routes/products.routes"

export async function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/login" })
  app.register(usersRoutes, { prefix: "/users" })
  app.register(forgotRoutes, { prefix: "/forgot-password" })
  app.register(resetRoutes, { prefix: "/reset-password" })
  app.register(productsRoutes, { prefix: "/products" })
}
