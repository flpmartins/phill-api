export interface IProductCreate {
  name: string
  description: string
  price: string
  category: string
  stock: string
  user_id: string
}

export interface IProductUpdate {
  name?: string
  description?: string
  price?: string
  category?: string
  stock?: string
  user_id?: string
}
