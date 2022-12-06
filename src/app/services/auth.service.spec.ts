import { HttpClient } from '@angular/common/http';
import { compileClassMetadata } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from '../models/product';
import { User } from '../models/user';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let user:User;
  const featProduct:Product = new Product(2, 'p2', 1, 'product 2', 1.00, 'img URL', true);

  var products:Product[] = [featProduct];
  beforeEach(() => {
    user = {id:1, token:'token', firstName: 'first', lastName: 'last', email:'email', wishList:[], password:'password'};
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient',['get','post','delete', 'put']);
    TestBed.configureTestingModule({
      providers:[{provide:HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retreive logged in status', ()=>{
    let resp:boolean = true;

    service.isLoggedIn().subscribe((response)=>{resp=response})
    
    expect(resp).toBe(false);
  })

  it('should be able to set a new value', ()=>{
    let resp:boolean = false;

    service.setIsLoggedIn(true);
    service.isLoggedIn().subscribe((response)=>{resp=response})

    expect(resp).toBe(true);

  })

  it('should send a login request', ()=>{
    httpClientSpy.post.and.returnValue(of(user));
    let resp:User = {id:0};

    service.login('email', 'password').subscribe((response)=>{resp=response})

    expect(resp.id).toBe(1);

  })

  it('should send a logout request', ()=>{
    httpClientSpy.post.and.returnValue(of(true));
    let resp:boolean = false;

    service.logout().subscribe((response)=>{resp=response})

    expect(resp).toBe(true);
  })

  it('should send a registration request', ()=>{
    httpClientSpy.post.and.returnValue(of(true));
    let resp:boolean = false;

    service.register('first','last','email','password').subscribe((response)=>{resp=response});

    expect(resp).toBe(true);
  })

  it('should set a new user', ()=>{
    let curUser = service.user;

    service.setUser(user);

    expect(curUser).not.toBe(service.user);
  })

  it('should add token to header', ()=>{
    service.user = user;
    expect(service.getUserHeader().Authorization).toContain('token');
  })


  it('should return a blank user', ()=>{
    
    let respUser:User = service.getUser()
    
    expect(respUser.id).toBe(0);

  })

  it('should return currently set user', ()=>{
    service.user= user;

    let respUser:User = service.getUser();

    expect(respUser.id).toBe(user.id);
  })

  it('should return currently set user in local storage', ()=>{
    localStorage.setItem('user', JSON.stringify(user))

    let respUser:User = service.getUser();

    expect(respUser.id).toBe(user.id);
  })

  it('should send a user to the db and retreive it back', ()=>{
    httpClientSpy.post.and.returnValue(of(user));

    let respUser:User = {id:0};

    service.updateUser(user).subscribe((response)=>{respUser=response});

    expect(respUser.id).toBe(user.id);
    expect(respUser.email).toBe(user.email);
    expect(respUser.firstName).toBe(user.firstName);
    expect(respUser.lastName).toBe(user.lastName);
    expect(respUser.wishList).toBe(user.wishList);
  })

  it('should handle logout', ()=>{
    localStorage.setItem('user', JSON.stringify(user));
    expect(localStorage.getItem('user')).toBeTruthy();
    service.loggedIn = true;

    service.handleLogout();
    
    expect(service.loggedIn).toBe(false);
    expect(localStorage.getItem('user')).toBeFalsy();
    
  })

  it('should get featured products', ()=>{
    httpClientSpy.get.and.returnValue(of(products));

    let respProducts:Product[] = [];

    service.getFeaturedProducts().subscribe((resp)=>{respProducts=resp})

    expect(respProducts.length).toBeGreaterThan(0);
    expect(respProducts[0].featured).toBe(true);
  })

  it('should change the password of a user', ()=>{
    httpClientSpy.post.and.returnValue(of(true));

    let resp:boolean = false;
    service.changePassword('email', 'old password', 'new password').subscribe((response)=>{resp=response})

    expect(resp).toBe(true);
    
  })

});
