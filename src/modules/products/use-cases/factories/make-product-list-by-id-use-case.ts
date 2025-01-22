import { PrismaProductsRepository } from "../../repositories/prisma/prisma-products-repository"

import { ProductListByIdUseCase } from "../product-list-by-id"

export function makeProductListByIdUseCaseUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()

  const productListByIdUseCaseUseCase = new ProductListByIdUseCase(
    prismaProductsRepository,
  )

  return productListByIdUseCaseUseCase
}
