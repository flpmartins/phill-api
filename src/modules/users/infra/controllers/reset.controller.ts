import { makeResetPasswordCase } from "@modules/users/use-cases/factories/make-reset-password-case"
import { FastifyRequest, FastifyReply } from "fastify"

import { z } from "zod"

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schemaBody = z.object({
    password: z.string().min(6),
  })

  const schemaParams = z.object({
    token: z.string(),
  })

  const { token } = schemaParams.parse(request.params)
  const { password } = schemaBody.parse(request.body)

  const resetPassword = makeResetPasswordCase()

  const result = await resetPassword.execute({
    token,
    password,
  })

  return reply.send({
    data: result,
  })
}
