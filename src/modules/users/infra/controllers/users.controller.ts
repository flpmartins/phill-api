import { FastifyRequest, FastifyReply } from "fastify"

import { z } from "zod"

import { makeUsersCreateUseCase } from "@modules/users/use-cases/factories/make-users-create-use-case"
import { makeListUserByIdUseCase } from "@modules/users/use-cases/factories/make-list-user-by-id-use-case"
import { makeUserUpdateUseCase } from "@modules/users/use-cases/factories/make-user-update-use-case"
import { makeUserUpdateAvatarUseCase } from "@modules/users/use-cases/factories/make-user-upload-avatar-use-case"
export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    email: z.string(),
    name: z.string(),
    cpf: z.string(),
    phone: z.string(),
  })

  const id_profile = "a9d2fbdc-64b9-4c8d-9b73-8a3c9fabcdd6"
  const payload = schema.parse(request.body)

  const createUser = makeUsersCreateUseCase()

  const user = await createUser.execute({
    avatar: null,
    cpf: payload.cpf,
    email: payload.email,
    name: payload.name,
    phone: payload.phone,
    id_profile,
  })

  return reply.status(201).send({ user })
}

export async function getUserById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    user_id: z.string(),
  })
  const requestData = schema.parse(request.params)

  const { user_id } = requestData

  const getUser = makeListUserByIdUseCase()

  const user = await getUser.execute(user_id)

  return reply.code(200).send({ user })
}
export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    cnpj: z.string().optional(),
    cpf: z.string().optional(),
    phone: z.string().optional(),
    avatar: z.string().optional(),
    id_profile: z.string().optional(),
  })

  const schemaParams = z.object({
    id: z.string(),
  })

  const data = schema.parse(request.body)

  const { id } = schemaParams.parse(request.params)

  const updateUser = makeUserUpdateUseCase()

  const user = await updateUser.execute(data, id)

  return reply.code(200).send({ user })
}

export async function updateAvatarUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    key: z.string(),
    id: z.string(),
  })

  const { key, id } = schema.parse(request.query)

  const file = await request.file()

  if (!file) {
    return reply.code(400).send({ error: "Arquivo não enviado" })
  }

  const updateAvatar = makeUserUpdateAvatarUseCase()

  const user = await updateAvatar.execute(key, file, id)

  return reply.code(200).send({ user })
}
