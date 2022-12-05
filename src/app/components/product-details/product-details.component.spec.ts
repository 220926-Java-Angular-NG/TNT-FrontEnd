import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { CartProduct } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart, ProductService } from 'src/app/services/product.service';

import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  
  // Product Mocks
  const product1:Product = new Product(1, 'p1', 1, 'product 1', 1.00, '../../assets/images/Testing.png', true);
  const product2:Product = new Product(2, 'p1', 1, 'product 1', 1.00, '../../assets/images/Testing.png', false);
  const product3:Product = new Product(3, 'p1', 1, 'product 1', 1.00, '../../assets/images/Testing.png', false);
  const userMock:User = {id:1};
  
  // dependancy injection mocks
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  
  let cartProduct1Mock: CartProduct;
  let cartProduct2Mock: CartProduct;
  let cartProduct3Mock: CartProduct;
  let cartMock: Cart;
  
  
  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', ['getProducts', 'getCart'])
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn', 'getUser']);
    cartServiceSpy = jasmine.createSpyObj<CartService>('CartService', ['getCart', 'addToCart', 'updateCartCount', 'removeFromCart']);

    // After creating spy objects, we are mocking the values
    cartProduct1Mock = {id: 1, quantity: 1, product: product1, user: userMock};
    cartProduct2Mock = {id: 2, quantity: 1, product: product2, user: userMock};
    cartProduct3Mock = {id: 3, quantity: 1, product: product3, user: userMock};
    cartMock = {cartCount: 2, products: [{product: product1, quantity: 1}, {product: product2, quantity: 1}], totalPrice: 2.00}
    
    authServiceSpy.getUser.and.returnValue(userMock);
    productServiceSpy.getCart.and.returnValue(of(cartMock));
    productServiceSpy.getProducts.and.returnValues(of([product1, product2]));
    authServiceSpy.isLoggedIn.and.returnValue(of(true));
    cartServiceSpy.getCart.and.returnValue(of([cartProduct1Mock,cartProduct2Mock, cartProduct3Mock]));


    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
          [{path: 'login', component: BlankComponent},
          {path: 'wishlist', component: BlankComponent},
          {path: 'cart', component: BlankComponent},
          {path: 'changle-password', component: BlankComponent},
          {path: 'home', component: BlankComponent}]
        )],
      declarations: [ ProductDetailsComponent ],
      providers: [{provide: ProductService, useValue: productServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: CartService, useValue: cartServiceSpy}],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should add a product to the cart', () => {
    let cartAddMock : Cart = {cartCount: 3, products: [{product: product1, quantity: 1}, {product: product2, quantity: 1}, {product: product3, quantity: 1}], totalPrice: 3.00}
    authServiceSpy.getUser.and.returnValue(userMock);
    cartServiceSpy.addToCart.and.returnValue(of(cartProduct3Mock));
    cartServiceSpy.updateCartCount;
    productServiceSpy.getCart.and.returnValue(of(cartAddMock));
    component.addToCart(product3);
    expect(component.cartItemId).toEqual(3);
    expect(component.isInCart).toBe(true);
  });

  it ('should remove product from the cart', () => {
    cartServiceSpy.removeFromCart.and.returnValue(of(false));
    cartServiceSpy.updateCartCount;
    component.removeFromCart();
    expect(component.isInCart).toBe(false);
  });

  it ('should set loading to false', () => {
    component.setLoading();
    expect(component.isLoading).toEqual(false);
  })

  it('should update quantity', () => {
    component.updateQuantity(5);
    expect(component.quantity).toEqual(6);
  })




  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});
