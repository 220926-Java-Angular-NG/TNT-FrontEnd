import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { Component, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CartProduct } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart, ProductService } from 'src/app/services/product.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const product1:Product = new Product(1, 'p1', 1, 'product 1', 1.00, 'img URL', true);
  const product2:Product = new Product(2, 'p1', 1, 'product 1', 1.00, 'img URL', false);
  const product3:Product = new Product(3, 'p1', 1, 'product 1', 1.00, 'img URL', false);
  const userMock:User = {id:1, firstName:"Matt"};
  let cartProduct1Mock: CartProduct;
  let cartProduct2Mock: CartProduct;
  let cartProduct3Mock: CartProduct;
  let cartMock: Cart;
 // let imgPath:string;
  
  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', ['getProducts'])
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn', 'getUser','handleLogout', 'logout']);
    cartServiceSpy = jasmine.createSpyObj<CartService>('CartService', ['updateCartCount', 'getCartCount']);

    //After creating spy objects, we are mocking the values
    cartProduct1Mock = {id: 1, quantity: 1, product: product1, user: userMock};
    cartProduct2Mock = {id: 2, quantity: 1, product: product2, user: userMock};
    cartProduct3Mock = {id: 3, quantity: 1, product: product3, user: userMock};
    cartMock = {cartCount: 2, products: [{product: product1, quantity: 1}, {product: product2, quantity: 1}], totalPrice: 2.00}
    productServiceSpy.getProducts.and.returnValues(of([product1, product2]));
    authServiceSpy.isLoggedIn.and.returnValue(of(true));
    authServiceSpy.loggedIn=true;
    
    authServiceSpy.handleLogout;
    authServiceSpy.getUser.and.returnValue(userMock);
    
    cartServiceSpy.updateCartCount;
    cartServiceSpy.getCartCount.and.returnValue(of(cartMock.cartCount));
    //imgPath = "../../../assets/images/favicon.png"

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
    
    //let page:HTMLElement = fixture.nativeElement;
    //if (page.querySelector('img')){
    //  page.querySelector('img')!.src = imgPath 
    //}
    
    //fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a count of cart items', ()=>{
    expect(component.cartCount).toBeGreaterThan(0);
  })

  it('should toggle states for drop-down',()=>{
    let curState = component.collapse;
    component.collapseToggle();
    expect(curState).toBe(!component.collapse);
  })

  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});
