import { Product } from "./product"

export interface User {
  id:number;
  token?:string;
  email?:string;
  password?:string;
  firstName?:string;
  lastName?:string;
  wishList?: Product[];
}