import { PrismaProductsRepository } from "../../repositories/prisma/prisma-products-repository"

import { ProductUpdateUseCase } from "../product-update"

export function makeProductUpdateUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()

  const productUpdateUseCase = new ProductUpdateUseCase(
    prismaProductsRepository,
  )

  return productUpdateUseCase
}
