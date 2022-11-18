import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from '../models/user';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;
  user?:user

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<user> {
    const payload = {email:email, password:password};
    return this.http.post<user>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  logout(): Observable<any>{
    return this.http.post<any>(`${this.authUrl}/logout`, null, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }

  setUser(user:user) {
    this.user = user
    // localStorage only stores string... store the user as a string
    localStorage.setItem('user', JSON.stringify(this.user))
  }

  // to get the user that is currently logged in
  // will return a user with id = 0 if not logged in
  getUser():user {
    this.loggedIn = true
    // if user is not logged in 
    // if (!this.loggedIn) return {id:0}
    // if user is already defined
    if (this.user && this.user.id !== 0)
      return this.user
    else { // user is not defined, so fetch it
      let tmp:user = this.fetchUser()
      if (tmp.id !== 0) {
        this.user = tmp
        return this.user
      }
    }
    // we dont have access to user so return false user
    this.loggedIn = false
    return {id:0}
  }

  fetchUser():user {
    let tmp = localStorage.getItem('user')
    let user:user = {id:0}
    // TODO: if localstorage is empty, fetch the user again
    if (tmp !== null) // localStorage only stores string... make sure we parse it to get its actual object
      user = JSON.parse(tmp)
    return user
  }


  handleLogout():void {
    localStorage.clear()
    this.loggedIn =false
    this.user = {id:0}
  }


  public getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.authUrl}/featured`, {headers: environment.headers});
  }
}
