import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartProduct } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';

import { CartProductComponent } from './cart-product.component';

describe('CartProductComponent', () => {
  let testHostComponent:TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProductComponent, TestHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(()=>{
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should have a cart product', () => {
    expect(testHostComponent.cartProductComponent.cartProduct).toEqual({id: 1, quantity: 1, product: new Product(2, 'p1', 50, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}});
  });

  it('should item from cart', () => {
    testHostComponent.cartProductComponent.deleteCartItem()
    expect(testHostComponent.userCartProducts).toEqual([{id: 2, quantity: 1, product: new Product(2, 'p1', 1, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}}]);
  });

  it('should update quantity of a cart product', () => {
    testHostComponent.cartProductComponent.updateCart(5)
    expect(testHostComponent.userCartProducts).toEqual([{id: 1, quantity: 5, product: new Product(2, 'p1', 50, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}},
    {id: 2, quantity: 1, product: new Product(2, 'p1', 1, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}}]);
  });

  it('should not update quantity of a cart product if below 1', () => {
    testHostComponent.cartProductComponent.updateQuantity(-1000)
    expect(testHostComponent.userCartProducts).toEqual([{id: 1, quantity: 1, product: new Product(2, 'p1', 50, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}},
    {id: 2, quantity: 1, product: new Product(2, 'p1', 1, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}}]);
  });

  it('should update quantity of a cart product by 1', () => {
    testHostComponent.cartProductComponent.updateQuantity(1)
    expect(testHostComponent.userCartProducts).toEqual([{id: 1, quantity: 2, product: new Product(2, 'p1', 50, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}},
    {id: 2, quantity: 1, product: new Product(2, 'p1', 1, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}}]);
  });

  it('should limit max quantity to stock of item', () => {
    testHostComponent.cartProductComponent.updateQuantity(10000)
    expect(testHostComponent.userCartProducts).toEqual([{id: 1, quantity: 50, product: new Product(2, 'p1', 50, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}},
    {id: 2, quantity: 1, product: new Product(2, 'p1', 1, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}}]);
  });



  @Component({
    selector: `host-component`,
    template: `<app-cart-product 
    [cartProduct]="userCartProducts[0]"
    (deleteItemEvent)="deleteFromCart($event)"
    (updateItemQuantityEvent)="updateCartItemQuantity(userCartProducts[0].id, $event)"></app-cart-product>`
  })
  class TestHostComponent{
    @ViewChild(CartProductComponent)
    public cartProductComponent!: CartProductComponent;
    
    // public product:CartProduct = {id: 1, quantity: 1, product: new Product(2, 'p1', 1, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}};
    public userCartProducts:CartProduct[] = [{id: 1, quantity: 1, product: new Product(2, 'p1', 50, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}},
    {id: 2, quantity: 1, product: new Product(2, 'p1', 1, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}}];

    public totalPrice:number = 5;

    deleteFromCart(item:number) {
      // console.log(item)
      this.userCartProducts = this.userCartProducts.filter(cartItem => cartItem.id !== item)
        // this.userCartProducts=[{id: 1, quantity: 1, product: new Product(2, 'p1', 1, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}}]
    }

    updateCartItemQuantity(itemId:number, quantity:number) {
      // console.log(item)
      let index = this.userCartProducts.findIndex(cartItem => cartItem.id === itemId)
      if (index > -1) {
        this.userCartProducts[index].quantity = quantity
      }
        // this.userCartProducts=[{id: 1, quantity: 1, product: new Product(2, 'p1', 1, 'product 1', 1.00, 'img URL', false), user: {id:1, firstName:"Jonathan"}}]
    }
    
    // ngOnInit(): void {
    //   cartProductComponent = new CartProductComponent()
    // }
  }
});
