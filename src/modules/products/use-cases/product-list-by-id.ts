import { ProductsRepository } from "../repositories/products-repository"

export class ProductListByIdUseCase {
  constructor(private productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(id: string) {
    const product = await this.productsRepository.findById(id)
    return product
  }
}
