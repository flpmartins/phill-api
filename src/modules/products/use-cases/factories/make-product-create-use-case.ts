import { PrismaProductsRepository } from "../../repositories/prisma/prisma-products-repository"

import { ProductCreateUseCase } from "../product-create"

export function makeProductCreateUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()

  const productCreateUseCase = new ProductCreateUseCase(
    prismaProductsRepository,
  )

  return productCreateUseCase
}
