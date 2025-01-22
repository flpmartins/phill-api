import { IProductCreate } from "@shared/dtos"
import { ProductsRepository } from "../repositories/products-repository"

export class ProductCreateUseCase {
  constructor(private productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(data: IProductCreate) {
    const product = await this.productsRepository.createProduct(data)

    return product
  }
}
