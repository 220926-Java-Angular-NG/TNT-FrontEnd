import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product';
import { CartProduct } from '../models/cart';
import { CartService } from './cart.service';
import { User } from '../models/user';
import { of } from 'rxjs';

fdescribe('CartService', () => {
  let service: CartService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  var cartProducts:CartProduct[] = [];
  const user:User = {id:1};
  const cartProduct:CartProduct = {id:1, quantity:1, user:user};
  const blankCartProduct:CartProduct = {id:0, quantity:0, user:user};

  beforeEach(() => {
    for (let i=0; i<3; i++){
      cartProducts.push(cartProduct)
    }
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient',['get','post','delete', 'put']);
    TestBed.configureTestingModule({
      providers:[{provide:HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get the number of items in the cart', ()=>{
    let fetchedCount:number = -1;
    
    service.getCartCount().subscribe(resp=>fetchedCount=resp);

    expect(fetchedCount).toBe(0);
  });

  it('should be able to set the number of items in the cart', ()=>{
    let count:number = 3;
    let fetchedCount:number=-1;

    service.setCartCount(count);
    service.getCartCount().subscribe(resp=>fetchedCount=resp);

    expect(fetchedCount).toBe(3);
  });

  it('should be able to update the number of items in the cart', ()=>{
    let userId:number = 1;
    let fetchedCount:number=-1;
    httpClientSpy.get.and.returnValue(of(cartProducts))

    service.updateCartCount(userId);
    service.getCartCount().subscribe(resp=>fetchedCount=resp);

    expect(fetchedCount).toBe(cartProducts.length);
  });

  it('should be able to get the cart from the db', ()=>{
    let userId:number = 1;
    let fetchedCartProducts:CartProduct[] = [];
    httpClientSpy.get.and.returnValue(of(cartProducts))

    service.getCart(userId).subscribe(resp=>fetchedCartProducts=resp);

    expect(fetchedCartProducts.length).toBe(cartProducts.length);
  });

  it('should be able to add a product to the cart in the db', ()=>{
    let fetchedCartProduct:CartProduct = blankCartProduct;
    httpClientSpy.post.and.returnValue(of(cartProduct))

    service.addToCart(cartProduct).subscribe(resp=>fetchedCartProduct=resp);

    expect(fetchedCartProduct.id).toBe(cartProduct.id);
  });

  it('should be able to update the quantity of items in the cart in the db', ()=>{
    let newQuantity:number = 2;
    let fetchedCartProduct:CartProduct = blankCartProduct;
    let updatedCartProduct:CartProduct = {id:1, quantity:newQuantity, user:user};
    httpClientSpy.put.and.returnValue(of(updatedCartProduct))

    service.updateCartQuantity(cartProduct, newQuantity).subscribe(resp=>fetchedCartProduct=resp);

    expect(fetchedCartProduct.quantity).toBe(newQuantity);
  });

  it('should be able to remove an item from the cart in the db', ()=>{
    httpClientSpy.delete.and.returnValue(of(cartProducts.includes(cartProduct)))
    let result:boolean = false;

    service.removeFromCart(cartProduct).subscribe(res=>{result=res});

    expect(result).toBe(true);
  });

  it('should be able to clear the items in the cart in the db', ()=>{
    httpClientSpy.delete.and.returnValue(of(cartProducts.length>0))
    let result:boolean = false;
    
    service.clearUserCart(user).subscribe(res=>{result=res});

    expect(result).toBe(true);
  });

});
