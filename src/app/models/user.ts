import { Product } from "./product"

export interface User {
  id:number;
  email?:string;
  password?:string;
  firstName?:string;
  lastName?:string;
  wishList?: Product[];
}