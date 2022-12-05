import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { CartProduct } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService, Cart } from 'src/app/services/product.service';

import { NavbarComponent } from './navbar.component';

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

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

    // creating spy objects
    productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', ['getProducts', 'getCart'])
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn', 'getUser']);
    cartServiceSpy = jasmine.createSpyObj<CartService>('CartService', ['getCart', 'addToCart', 'updateCartCount', 'removeFromCart']);
    
    // After creating spy objects, we are mocking the values
    cartProduct1Mock = {id: 1, quantity: 1, product: product1, user: userMock};
    cartProduct2Mock = {id: 2, quantity: 1, product: product2, user: userMock};
    cartProduct3Mock = {id: 3, quantity: 1, product: product3, user: userMock};
    cartMock = {cartCount: 2, products: [{product: product1, quantity: 1}, {product: product2, quantity: 1}], totalPrice: 2.00}
    
    productServiceSpy.getProducts.and.returnValues(of([product1, product2]));
    authServiceSpy.isLoggedIn.and.returnValue(of(true));
    authServiceSpy.getUser.and.returnValue(userMock);
    productServiceSpy.getCart.and.returnValue(of(cartMock));
    cartServiceSpy.updateCartCount;
    
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{path: 'login', component: BlankComponent}]
      )],
      declarations: [ NavbarComponent ],
      providers: [{provide: ProductService, useValue: productServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: CartService, useValue: cartServiceSpy}],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
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
