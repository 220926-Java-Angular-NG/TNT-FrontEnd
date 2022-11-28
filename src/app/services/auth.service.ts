import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;
  user?:User

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _isLoggedIn$ = this._isLoggedIn.asObservable();

  isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn$;
  }

  setIsLoggedIn(latestValue: boolean) {
    return this._isLoggedIn.next(latestValue);
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    const payload = {email:email, password:password};
    return this.http.post<User>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  logout(): Observable<any>{
    return this.http.post<any>(`${this.authUrl}/logout`, null, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  register(firstName: string, lastName: string, email: string, password: string, wishList: Product[]): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password, wishList: wishList};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }

  setUser(user:User) {
    this.user = user
    // localStorage only stores string... store the user as a string
    localStorage.setItem('user', JSON.stringify(this.user))
  }

  // to get the user that is currently logged in
  // will return a user with id = 0 if not logged in
  getUser():User {
    //this.loggedIn = true
    this.setIsLoggedIn(this.loggedIn)
    // if user is not logged in 
    // if (!this.loggedIn) return {id:0}
    // if user is already defined
    if (this.user && this.user.id !== 0)
      return this.user
    else { // user is not defined, so fetch it
      let tmp:User = this.fetchUser()
      if (tmp.id !== 0) {
        this.user = tmp
        return this.user
      }
    }
    // we dont have access to user so return false user
    this.loggedIn = false
    this.setIsLoggedIn(this.loggedIn)
    return {id:0}
  }

  fetchUser():User {
    let tmp = localStorage.getItem('user')
    let user:User = {id:0}
    // TODO: if localstorage is empty, fetch the user again
    if (tmp !== null) // localStorage only stores string... make sure we parse it to get its actual object
      user = JSON.parse(tmp)
    return user
  }

  updateUser(user: User): Observable<any> {
    const payload = {id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, wishList: user.wishList};
    return this.http.post<User>(`${this.authUrl}/wishlist`, payload, {headers: environment.headers});

  }

  updateWishList(wishList: Product[]) : void {
    if (this.user) {
      this.user.wishList = wishList;
    
      this.updateUser(this.user);
    }
      
  
  }


  handleLogout():void {
    localStorage.clear()
    this.loggedIn =false
    this.setIsLoggedIn(this.loggedIn)
    this.user = {id:0}
  }


  public getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.authUrl}/featured`, {headers: environment.headers});
  }
}
