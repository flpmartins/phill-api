import { FastifyInstance } from "fastify"

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/products.controller"
import { ensureAuthentication } from "@shared/middlewares/ensure-authentication"

export async function productsRoutes(app: FastifyInstance) {
  app.post("/", { onRequest: ensureAuthentication }, createProduct)
  app.get("/list", { onRequest: ensureAuthentication }, getProducts)
  app.post("/:id", { onRequest: ensureAuthentication }, getProductById)
  app.put("/:id", { onRequest: ensureAuthentication }, updateProduct)
  app.delete("/:product_id", { onRequest: ensureAuthentication }, deleteProduct)
}
