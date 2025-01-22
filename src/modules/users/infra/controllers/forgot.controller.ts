import { FastifyRequest, FastifyReply } from "fastify"

import { makeForgotPasswordUseCase } from "@modules/users/use-cases/factories/make-forgot-password-use-case"

import { z } from "zod"

export async function forgotPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    email: z.string().email(),
  })

  const { email } = schema.parse(request.body)

  const sendMail = makeForgotPasswordUseCase()

  await sendMail.execute(email)

  return reply.status(200).send({
    message: "Email enviado para criar nova senha",
  })
}
