import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { user } from 'src/app/models/user';
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
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  emptyCart(): void {
    let user:user = this.authService.getUser()
    // console.log(user)
    this.cartService.clearUserCart(user).subscribe(res => {
      console.log(res)
    })
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.00
    };
    this.productService.setCart(cart);
    this.router.navigate(['/home']);
  }

}
