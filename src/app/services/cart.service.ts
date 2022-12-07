import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartProduct } from '../models/cart';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl: string = "/cart";
  private _cartCount = new BehaviorSubject<number>(0);
  private _cartCount$ = this._cartCount.asObservable();
  constructor(private http: HttpClient, private authService:AuthService) { }

  getCartCount(): Observable<number> {
    return this._cartCount$;
  }

  setCartCount(latestValue: number) {
    return this._cartCount.next(latestValue);
  }

  updateCartCount(userId:number) {
    this.getCart(userId).subscribe(cart => {
			let count = 0
			cart.forEach(cartItem => {
				count += cartItem.quantity
			})
			this.setCartCount(count)
		})
  }

  public getCart(userId:number): Observable<CartProduct[]> {
    
    let headers = this.authService.getUserHeader()
    return this.http.get<CartProduct[]>(
      environment.baseUrl+this.cartUrl+`/user/${userId}`, 
      {headers, withCredentials: environment.withCredentials});
  }

  public addToCart(cartProduct:CartProduct): Observable<CartProduct> {
    let headers = this.authService.getUserHeader()
    return this.http.post<CartProduct>(
      environment.baseUrl+this.cartUrl,
      cartProduct,
      {headers, 
        withCredentials: environment.withCredentials
      });
  }
  public updateCartQuantity(cartProduct:CartProduct, quantity:number): Observable<CartProduct> {
    let headers = this.authService.getUserHeader()
    return this.http.put<CartProduct>(
      environment.baseUrl+this.cartUrl+`/item/${cartProduct.id}/quantity/${quantity}`,
      null,
      {headers, 
        withCredentials: environment.withCredentials
      });
  }

  public removeFromCart(cartProduct:CartProduct): Observable<any> {
    let headers = this.authService.getUserHeader()
    return this.http.delete<any>(
      environment.baseUrl+this.cartUrl+`/item/${cartProduct.id}`,
      {headers, 
        withCredentials: environment.withCredentials
      });
  }
  public clearUserCart(user:User): Observable<any> {
    let headers = this.authService.getUserHeader()
    return this.http.delete<any>(
      environment.baseUrl+this.cartUrl+`/user/${user.id}`,
      {headers, 
        withCredentials: environment.withCredentials
      });
  }
}
