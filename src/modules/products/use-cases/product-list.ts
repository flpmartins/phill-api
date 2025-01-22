import { Products } from "@prisma/client"
import { ProductsRepository } from "../repositories/products-repository"
export interface PaginatedProducts {
  products: Products[]
  totalProducts: number
  currentPage: number
  totalPages: number
}

export class ProductsListUseCase {
  constructor(private productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(user_id: string, limit: number, page: number, q?: string) {
    const products = await this.productsRepository.getProducts(
      user_id,
      limit,
      page,
      q,
    )
    return products
  }
}
