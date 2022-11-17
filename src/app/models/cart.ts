import { Product } from "./product"
import { user } from "./user"

export interface CartProduct {
  id:number
  quantity:number
  product:Product
  user:user
}