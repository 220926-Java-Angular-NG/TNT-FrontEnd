import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CartProduct } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

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
    productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', ['getProducts', 'purchase'])
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn', 'getUser','handleLogout', 'logout']);
    cartServiceSpy = jasmine.createSpyObj<CartService>('CartService', ['getCart', 'removeFromCart', 'updateCartCount', 'updateCartQuantity', 'clearUserCart']);
    //After creating spy objects, we are mocking the values
    cartProduct1Mock = {id: 1, quantity: 1, product: product1, user: userMock};
    cartProduct2Mock = {id: 2, quantity: 1, product: product2, user: userMock};
    cartProduct3Mock = {id: 3, quantity: 1, product: product3, user: userMock};
    UserCartMock = [cartProduct1Mock, cartProduct2Mock, cartProduct3Mock]
    updatedCartProductMock = cartProduct2Mock
    productServiceSpy.getProducts.and.returnValues(of([product1, product2]));
    // productServiceSpy.purchase.and.
    productServiceSpy.purchase.and.returnValues(of(true));
    authServiceSpy.getUser.and.returnValue(userMock);
    cartServiceSpy.getCart.and.returnValues(of(UserCartMock))
    cartServiceSpy.updateCartCount.and.returnValues()

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [
          {path: 'home', component: BlankComponent}
        ]
      )],
      declarations: [ CheckoutComponent ],
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
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a total of 3.00', () => {
    expect(component.totalPrice).toEqual(3.00);
  });

  it('should have a total of 3.00', () => {
    let navigateSpy = spyOn(router, 'navigate')
    cartServiceSpy.clearUserCart.and.returnValues(of(updatedCartProductMock))
    component.onSubmit()
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});
