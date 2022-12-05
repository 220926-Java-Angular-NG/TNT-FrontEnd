import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { CartProduct } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/services/product.service';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  // Service mocks
  let cartServiceSpy : jasmine.SpyObj<CartService>;
  let authServiceSpy : jasmine.SpyObj<AuthService>;

  // Mocks of user and some products
  const product1:Product = new Product(1, 'p1', 1, 'product 1', 1.00, '../../assets/images/Testing.png', true);
  const product2:Product = new Product(2, 'p2', 2, 'product 2', 1.00, '../../assets/images/Testing.png', false);
  const product3:Product = new Product(3, 'p2', 3, 'product 3', 1.00, '../../assets/images/Testing.png', false);

  const userMock : User = {id:1, wishList: [product1, product2] };
  
  const cartProduct1Mock : CartProduct = {id: 1, quantity: 1, product: product1, user: userMock};
  const cartProduct2Mock : CartProduct = {id: 2, quantity: 1, product: product2, user: userMock};
  const cartProduct3Mock : CartProduct = {id: 3, quantity: 1, product: product3, user: userMock};

  let cartMock : Cart;

  beforeEach(async () => {

    // assigning the spy objects
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['loggedIn', 'isLoggedIn', 'getUser']);
    cartServiceSpy = jasmine.createSpyObj<CartService>('CartService', ['getCart', 'addToCart', 'updateCartCount', 'removeFromCart']); 

    // mocking the values
    authServiceSpy.loggedIn = true;
    cartMock = {cartCount: 2, products: [{product: product1, quantity: 1}, {product: product2, quantity: 1}], totalPrice: 2.00}

    //mocking the dependencies
    authServiceSpy.getUser.and.returnValue(userMock);
    cartServiceSpy.getCart.and.returnValue(of([cartProduct1Mock,cartProduct2Mock]));

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(
        [{path: 'login', component: BlankComponent}]
      )],
      declarations: [ ProductCardComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy},
        {provide: CartService, useValue: cartServiceSpy}],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});
