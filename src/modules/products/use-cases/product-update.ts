import { IProductUpdate } from "@shared/dtos"
import { ProductsRepository } from "../repositories/products-repository"
import { AppError } from "@shared/error/AppError"

export class ProductUpdateUseCase {
  constructor(private productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(data: IProductUpdate, id: string) {
    const productExists = await this.productsRepository.findById(id)

    if (!productExists) {
      throw new AppError("Product not found")
    }

    const product = await this.productsRepository.updateProduct(data, id)

    return product
  }
}
