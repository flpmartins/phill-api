import fastify from "fastify"
import { ZodError } from "zod"
import fastifyJwt from "@fastify/jwt"
import fastifyCors from "@fastify/cors"
import fastifyMultipart from "@fastify/multipart"

import { env } from "../env"
import { routes } from "../infra/routes"
import { logger } from "@shared/helpers/logger"

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation Error", issues: error.format() })
  }

  logger.error(error)
  return reply.status(error.statusCode || 500).send({ message: error.message })
})

export { app }
