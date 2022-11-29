import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cart';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

  constructor() { }

  @Input() cartProduct!:CartProduct
  @Output() deleteItemEvent = new EventEmitter<number>();
  @Output() updateItemQuantityEvent = new EventEmitter<number>();

  ngOnInit(): void {
  }

  updateQuantity(change:number): void {
    if (this.cartProduct.quantity + change >= 1)
      this.updateCart(this.cartProduct.quantity + change)
  }

  updateCart(quantity:number):void {
    this.updateItemQuantityEvent.emit(quantity)
  }

  deleteCartItem():void {
    this.deleteItemEvent.emit(this.cartProduct.id)
  }

}
