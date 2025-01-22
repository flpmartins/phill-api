import { ProductsRepository } from "../repositories/products-repository"
import { AppError } from "@shared/error/AppError"

export class ProductDeleteUseCase {
  constructor(private productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(id: string) {
    const productExists = await this.productsRepository.findById(id)

    if (!productExists) {
      throw new AppError("Product not found")
    }

    const product = await this.productsRepository.deleteProduct(id)

    return product
  }
}
