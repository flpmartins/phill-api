import { FastifyRequest, FastifyReply } from "fastify"

import { z } from "zod"

import { makeLoginUseCase } from "../../use-cases/factories/make-login-use-case"
import { env } from "@shared/env"

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = schema.parse(request.body)

  const loginUseCase = makeLoginUseCase()

  const user = await loginUseCase.execute({ email, password })

  const token = await reply.jwtSign(
    {
      roles: {
        id: user.id,
        id_profile: user.id_profile,
        permissions: user.profile?.permissions,
      },
    },
    {
      sign: {
        sub: user.id,
        expiresIn: env.JWT_EXPIRES_IN,
      },
    },
  )

  return reply.send({
    data: {
      user: { ...user, password: undefined },
      token,
    },
  })
}
