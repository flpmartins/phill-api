import { PrismaProductsRepository } from "../../repositories/prisma/prisma-products-repository"

import { ProductsListUseCase } from "../product-list"

export function makeProductsListUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()

  const productsListUseCase = new ProductsListUseCase(prismaProductsRepository)

  return productsListUseCase
}
