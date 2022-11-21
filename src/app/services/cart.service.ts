import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartProduct } from '../models/cart';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl: string = "/cart";
  private _cartCount = new BehaviorSubject<number>(0);
  private _cartCount$ = this._cartCount.asObservable();
  constructor(private http: HttpClient) { }

  getCartCount(): Observable<number> {
    return this._cartCount$;
  }

  setCartCount(latestValue: number) {
    return this._cartCount.next(latestValue);
  }

  updateCartCount(userId:number) {
    this.getCart(userId).subscribe(cart => this.setCartCount(cart.length))
  }

  public getCart(userId:number): Observable<CartProduct[]> {
    return this.http.get<CartProduct[]>(
      environment.baseUrl+this.cartUrl+`/user/${userId}`, 
      {headers: environment.headers, 
        withCredentials: environment.withCredentials
      });
  }

  public addToCart(cartProduct:CartProduct): Observable<CartProduct> {
    return this.http.post<CartProduct>(
      environment.baseUrl+this.cartUrl,
      cartProduct,
      {headers: environment.headers, 
        withCredentials: environment.withCredentials
      });
  }
  public updateCartQuantity(cartProduct:CartProduct, quantity:number): Observable<CartProduct> {
    return this.http.put<CartProduct>(
      environment.baseUrl+this.cartUrl+`/item/${cartProduct.id}/quantity/${quantity}`,
      null,
      {headers: environment.headers, 
        withCredentials: environment.withCredentials
      });
  }

  public removeFromCart(cartProduct:CartProduct): Observable<any> {
    return this.http.delete<any>(
      environment.baseUrl+this.cartUrl+`/item/${cartProduct.id}`,
      {headers: environment.headers, 
        withCredentials: environment.withCredentials
      });
  }
  public clearUserCart(user:User): Observable<any> {
    return this.http.delete<any>(
      environment.baseUrl+this.cartUrl+`/user/${user.id}`,
      {headers: environment.headers, 
        withCredentials: environment.withCredentials
      });
  }
}
