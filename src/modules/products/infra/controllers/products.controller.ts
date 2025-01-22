import { FastifyRequest, FastifyReply } from "fastify"

import { makeProductCreateUseCase } from "@modules/products/use-cases/factories/make-product-create-use-case"
import { makeProductUpdateUseCase } from "@modules/products/use-cases/factories/make-product-update-use-case"
import { makeProductListByIdUseCaseUseCase } from "@modules/products/use-cases/factories/make-product-list-by-id-use-case"
import { makeProductsListUseCase } from "@modules/products/use-cases/factories/make-product-list-use-case"
import { makeProductDeleteUseCase } from "@modules/products/use-cases/factories/make-product-delete-use-case"

import { z } from "zod"

export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.string(),
    category: z.string(),
    stock: z.string(),
  })

  const payload = schema.parse(request.body)

  const user_id = request.user.roles.id
  const createproduct = makeProductCreateUseCase()

  const product = await createproduct.execute({ ...payload, user_id })

  return reply.status(201).send({ product })
}

export async function getProductById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    product_id: z.string(),
  })
  const requestData = schema.parse(request.params)

  const { product_id } = requestData

  const getproduct = makeProductListByIdUseCaseUseCase()

  const product = await getproduct.execute(product_id)

  return reply.code(200).send({ product })
}

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    page: z.string().transform((val) => parseInt(val, 10)),
    limit: z.string().transform((val) => parseInt(val, 10)),
    q: z.string().optional(),
  })
  const { q, limit, page } = schema.parse(request.query)

  const user_id = request.user.roles.id

  const getproduct = makeProductsListUseCase()

  const product = await getproduct.execute(user_id, limit, page, q)

  return reply.code(200).send({ product })
}
export async function updateProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.string().optional(),
    category: z.string().optional(),
    stock: z.string().optional(),
  })
  const schemaParams = z.object({
    id: z.string(),
  })

  const data = schema.parse(request.body)

  const { id } = schemaParams.parse(request.params)

  const updateProduct = makeProductUpdateUseCase()

  const product = await updateProduct.execute(data, id)

  return reply.code(200).send({ product })
}

export async function deleteProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    product_id: z.string(),
  })
  const requestData = schema.parse(request.params)

  const { product_id } = requestData

  const deleteProduct = makeProductDeleteUseCase()

  const product = await deleteProduct.execute(product_id)

  return reply.code(200).send({ product })
}
