import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  userCartProducts:CartProduct[] = []

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private cartService:CartService,
    private authService:AuthService) { }

  ngOnInit(): void {
      this.cartService.getCart(this.authService.getUser().id).subscribe(cart => {
        this.userCartProducts = cart
        console.log(cart)
      })
      // ---- start deprecated ---- //
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
      }
    );
    // ---- end deprecated ---- //
  }

  deleteFromCart(cartId:number) {
    if (cartId !== 0) {
      let cartItem:CartProduct = {
        id:cartId,
        quantity:0,
        user: {id: this.authService.getUser().id},
      }
      this.cartService.removeFromCart(cartItem).subscribe(res => {
        let index = this.userCartProducts.findIndex(item => item.id === cartId)
        if (index != -1) this.userCartProducts.splice(index, 1)
        this.cartService.updateCartCount(this.authService.getUser().id)
      })
    }
  }

  updateCartItemQuantity(cartId:number, quantity:number) {
    if (cartId !== 0) {
      let cartItem:CartProduct = {
        id:cartId,
        quantity:0,
        user: {id: this.authService.getUser().id},
      }
      this.cartService.updateCartQuantity(cartItem, quantity).subscribe(res => {
        console.log(res)
        let index = this.userCartProducts.findIndex(item => item.id === res.id)
        if (index != -1) this.userCartProducts.splice(index, 1, res)
        this.cartService.updateCartCount(this.authService.getUser().id)
      })
    }
  }

  emptyCart(): void {
    let user:User = this.authService.getUser()
    this.cartService.clearUserCart(user).subscribe(res => {
      // console.log(res)
      this.cartService.updateCartCount(user.id)
    })

    // ---- start deprecated ---- //
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.00
    };
    this.productService.setCart(cart);
    // ---- end deprecated ---- //

    this.router.navigate(['/home']);
  }

}
