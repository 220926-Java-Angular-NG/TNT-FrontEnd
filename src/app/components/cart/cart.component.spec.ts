import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Route, Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

import { RouterTestingModule } from '@angular/router/testing';
import { CartProduct } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart, ProductService } from 'src/app/services/product.service';
import { HomepageComponent } from '../homepage/homepage.component';

import { CartComponent } from './cart.component';
import { Component } from '@angular/core';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  // Service Mocks
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let router:Router;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const product1:Product = new Product(1, 'p1', 1, 'product 1', 1.00, 'img URL', true);
  const product2:Product = new Product(2, 'p1', 1, 'product 1', 1.00, 'img URL', false);
  const product3:Product = new Product(3, 'p1', 1, 'product 1', 1.00, 'img URL', false);
  const userMock:User = {id:1, firstName:"Jonathan"};
  let cartProduct1Mock: CartProduct;
  let cartProduct2Mock: CartProduct;
  let cartProduct3Mock: CartProduct;
  let updatedCartProductMock: CartProduct;
  let UserCartMock: CartProduct[];
  let UserCartMockUpdated: CartProduct[];

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', ['getProducts'])
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn', 'getUser','handleLogout', 'logout']);
    cartServiceSpy = jasmine.createSpyObj<CartService>('CartService', ['getCart', 'removeFromCart', 'updateCartCount', 'updateCartQuantity', 'clearUserCart']);
    //After creating spy objects, we are mocking the values
    cartProduct1Mock = {id: 1, quantity: 1, product: product1, user: userMock};
    cartProduct2Mock = {id: 2, quantity: 1, product: product2, user: userMock};
    cartProduct3Mock = {id: 3, quantity: 1, product: product3, user: userMock};
    // updatedCartProductMock = {...cartProduct1Mock}
    UserCartMock = [cartProduct1Mock, cartProduct2Mock, cartProduct3Mock]
    // cartMock = {cartCount: 2, products: [{product: product1, quantity: 1}, {product: product2, quantity: 1}], totalPrice: 2.00}
    productServiceSpy.getProducts.and.returnValues(of([product1, product2]));
    // authServiceSpy.isLoggedIn.and.returnValue(of(true));
    // authServiceSpy.loggedIn=true;
    authServiceSpy.getUser.and.returnValue(userMock);

    cartServiceSpy.getCart.and.returnValues(of(UserCartMock))
    // cartServiceSpy.removeFromCart.and.returnValues(of(true))
    cartServiceSpy.updateCartCount.and.returnValues()
    // cartServiceSpy.updateCartQuantity.and.returnValues(of(updatedCartProductMock))
    // cartServiceSpy.clearUserCart.and.returnValues(of(true))


    // cartServiceSpy.getCartCount.and.returnValue(of(cartMock.cartCount));






    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [
          {path: 'home', component: BlankComponent}
        ]
      )],
      declarations: [ CartComponent ],
      providers: [
        {provide: ProductService, useValue: productServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: CartService, useValue: cartServiceSpy}
      ],
        schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);

    // TestBed.configureTestingModule({
    //   imports: [
    //     RouterTestingModule.withRoutes(
    //       [{path:'home', component:HomepageComponent}]
    //     )
    //   ]
    // })
    // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'],['post']);
    // productService = new ProductService(httpClientSpy);
    // authService = new AuthService(httpClientSpy);
    // cartService = new CartService(httpClientSpy);
    // router = new RouterTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three items in cart', ()=>{
    expect(component.userCartProducts).toEqual(UserCartMock)
  })

  it('should have totalPrice of 3.00', ()=>{
    component.calculateTotal()
    expect(component.totalPrice).toEqual(3.00)
  })

  it('should have totalPrice of 5.00', ()=>{
    updatedCartProductMock = {...cartProduct1Mock, quantity: 3}
    cartServiceSpy.updateCartQuantity.and.returnValues(of(updatedCartProductMock))
    component.updateCartItemQuantity(updatedCartProductMock.id, updatedCartProductMock.quantity)
    expect(component.totalPrice).toEqual(5.00)
  })
  it('should empty the cart', ()=>{
    // updatedCartProductMock = {...cartProduct1Mock, quantity: 3}
    // cartServiceSpy.updateCartQuantity.and.returnValues(of(updatedCartProductMock))
    // component.updateCartItemQuantity(updatedCartProductMock.id, updatedCartProductMock.quantity)
    let navigateSpy = spyOn(router, 'navigate')
    cartServiceSpy.clearUserCart.and.returnValues(of(updatedCartProductMock))
    component.emptyCart()
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  })
  it('should delete item from cart', ()=>{
    UserCartMockUpdated = [cartProduct2Mock, cartProduct3Mock]
    cartServiceSpy.removeFromCart.and.returnValues(of(true))
    component.deleteFromCart(cartProduct1Mock.id)
    expect(component.userCartProducts).toEqual(UserCartMock);
  })



  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});
