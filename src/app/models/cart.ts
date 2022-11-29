import { Product } from "./product"
import { User } from "./user"

export interface CartProduct {
  id:number
  quantity:number
  product?:Product
  user:User
}