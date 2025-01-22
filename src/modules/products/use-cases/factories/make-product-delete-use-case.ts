import { PrismaProductsRepository } from "../../repositories/prisma/prisma-products-repository"

import { ProductDeleteUseCase } from "../product-delete"

export function makeProductDeleteUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()

  const productDeleteUseCase = new ProductDeleteUseCase(
    prismaProductsRepository,
  )

  return productDeleteUseCase
}
