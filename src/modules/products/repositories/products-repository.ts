import { Products } from "@prisma/client"
import { IProductCreate, IProductUpdate } from "@shared/dtos"
import { PaginatedProducts } from "../use-cases/product-list"

export interface ProductsRepository {
  getProducts(
    user_id: string,
    limit: number,
    page: number,
    q?: string,
  ): Promise<PaginatedProducts>
  createProduct(data: IProductCreate): Promise<Products>
  updateProduct(data: IProductUpdate, id: string): Promise<Products>
  findById(id: string): Promise<Products | null>
  deleteProduct(id: string): Promise<null>
}
