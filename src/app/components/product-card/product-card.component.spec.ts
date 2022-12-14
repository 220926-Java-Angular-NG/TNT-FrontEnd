import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { CartProduct } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

   // Product Mocks
   const product1:Product = new Product(1, 'p1', 8, 'product 1', 1.00, '../../assets/images/Testing.png', true);
   const product2:Product = new Product(2, 'p1', 1, 'product 1', 1.00, '../../assets/images/Testing.png', false);
   const product3:Product = new Product(3, 'p1', 1, 'product 1', 1.00, '../../assets/images/Testing.png', false);

   let userMock:User;
   
   // dependancy injection mocks
   let cartServiceSpy: jasmine.SpyObj<CartService>;
   let authServiceSpy: jasmine.SpyObj<AuthService>;
   
   let cartProduct1Mock: CartProduct;
   let cartProduct2Mock: CartProduct;
   let cartProduct3Mock: CartProduct;
   

  beforeEach(async () => {

    // Mocking the service injections
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn', 'getUser', 'updateUser', 'setUser']);
    cartServiceSpy = jasmine.createSpyObj<CartService>('CartService', ['getCart', 'addToCart', 'updateCartCount', 'removeFromCart']);


    // After creating spy objects, we are mocking the values
    cartProduct1Mock = {id: 1, quantity: 1, product: product1, user: userMock};
    cartProduct2Mock = {id: 2, quantity: 1, product: product2, user: userMock};
    cartProduct3Mock = {id: 3, quantity: 1, product: product3, user: userMock};
    userMock = {id:1, wishList: [product1, product2]};
    
    authServiceSpy.isLoggedIn.and.returnValue(of(true));
    authServiceSpy.getUser.and.returnValue(userMock);
    cartServiceSpy.getCart.and.returnValue(of([cartProduct1Mock, cartProduct2Mock]));

    
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
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
    component.productInfo = product1;
    component.wishList = [product1, product2];
    fixture.detectChanges();
    console.log('wishList testing', component.wishList);
  });

  afterEach(() => {
    component.wishList = [product1, product2];
  });

  afterEach(() => {
    component.wishList = [product1, product2];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have 2 items in the wish list', () => {
    expect(component.wishList?.length).toBe(2);
  });

  it('should add product3 to the cart', () => {
    component.productInfo = product3;
    fixture.detectChanges();
    cartServiceSpy.addToCart.and.returnValue(of(cartProduct3Mock));
    cartServiceSpy.updateCartCount;
    component.addToCart(component.productInfo);
    expect(component.cartItemId).toEqual(cartProduct3Mock.product?.id);
  });

  it('should check if the item is in the cart', () => {
    component.productInfo = product2;
    let _cartItems = [cartProduct1Mock, cartProduct2Mock];

    _cartItems.forEach(item => {
      if (item.product && component.productInfo.id === item.product.id) {
        component.isInCart = true
        component.cartItemId = item.id
      }
    })

    expect(component.isInCart).toBe(true);
  })

  it('should check if the item is in the cart', () => {
    component.productInfo = product3;
    let _cartItems = [cartProduct1Mock, cartProduct2Mock];

    _cartItems.forEach(item => {
      if (item.product && component.productInfo.id === item.product.id) {
        component.isInCart = true
        component.cartItemId = item.id
      }
    })

    expect(component.isInCart).toBe(false);
  })


  // TODO: Fix This Test!!!
  // I am not sure what does this.cartService.removeFromCart(cartItem) returns,
  // so i am not sure how to set up the subscribe properly
  it('should remove an item from the cart', () => {
    component.productInfo = product2;
    let _cartItems = [cartProduct1Mock, cartProduct2Mock];
    
    _cartItems.forEach(item => {
      if (item.product && component.productInfo.id === item.product.id) {
        component.isInCart = true
        component.cartItemId = item.id
      }
    })
    console.log(' remove isInCart Testing',component.isInCart);
    cartServiceSpy.removeFromCart.and.returnValue(of(true));
      
    
    component.removeFromCart();
    expect(component.isInCart).toBe(false);
  });

 
  it('should check if product3 is in the wish list', () => {
    component.productInfo = product3;
    fixture.detectChanges();
    expect(component.isInWishList(component.productInfo)).toBe(false);
  });

  it('should add product3 to wish list', () => {
    let updatedUser : User = {id: 1, wishList: [product1, product2, product3]};
    authServiceSpy.updateUser.and.returnValue(of(updatedUser));
    authServiceSpy.setUser;
    component.addToWishList(product3);
    expect(component.wishList).toContain(product3);
    component.wishList = [product1, product2];
  });

  it('should remove product2 from the wish list', () => {
    let updatedUser : User = {id: 1, wishList: [product1]};
    authServiceSpy.updateUser.and.returnValue(of(updatedUser));
    authServiceSpy.setUser;
    component.removeFromWishList(product2);
    expect(component.wishList).not.toContain(product2);
  });

  it('should update quantity', () => {
    component.updateQuantity(4);
    expect(component.quantity).toBe(5);
  });

  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});