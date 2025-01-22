import { prisma } from "@config/prisma"

import { ProductsRepository } from "../products-repository"
import { IProductCreate, IProductUpdate } from "@shared/dtos"
import { PaginatedProducts } from "@modules/products/use-cases/product-list"

export class PrismaProductsRepository implements ProductsRepository {
  async createProduct(data: IProductCreate) {
    const product = await prisma.products.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
        stock: data.stock,
        user_id: data.user_id,
      },
    })

    return product
  }

  async findById(id: string) {
    const product = await prisma.products.findUnique({
      where: {
        id,
      },
    })

    return product
  }

  async updateProduct(data: IProductUpdate, id: string) {
    const user = await prisma.products.update({
      where: {
        id,
      },
      data: {
        category: data.category,
        description: data.description,
        name: data.name,
        stock: data.stock,
        price: data.price,
      },
    })

    return user
  }

  async getProducts(
    user_id: string,
    limit: number,
    page: number,
    q?: string,
  ): Promise<PaginatedProducts> {
    const whereClause: any = {
      user_id,
    }
    if (q) {
      whereClause.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { category: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ]
    }
    const skip = (page - 1) * limit
    const take = limit

    const totalProducts = await prisma.products.count({
      where: whereClause,
    })

    const totalPages = Math.ceil(totalProducts)

    const products = await prisma.products.findMany({
      where: whereClause,
      take,
      skip,
    })
    return {
      products,
      totalProducts,
      currentPage: page,
      totalPages,
    }
  }

  async deleteProduct(id: string) {
    await prisma.products.delete({
      where: {
        id,
      },
    })
    return null
  }
}
