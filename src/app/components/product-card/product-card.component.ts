import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartProduct } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  // the product we are rendering
  @Input() productInfo!: Product;
  // the quantity rendered
  quantity:number = 1
  // is the item in the user's cart?
  isInCart:boolean = false
  // if the item is in the user's cart: then this is the cart's ID
  cartItemId?:number

  constructor(private productService: ProductService, private cartService:CartService, private authService:AuthService, private router: Router) { }
  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  featuredBanner = "assets/images/featured.png"

  isLoggedIn = this.authService.loggedIn;

  
  ngOnInit(): void {
    if (this.isLoggedIn)
      this.checkIfInCart()
  }

  // will add an item to the cart
  addToCart(product: Product): void {
      let currUser:User = this.authService.getUser()
      let cartItem:CartProduct = {
        id:0,
        quantity:this.quantity,
        product:product,
        user: currUser
      }
      this.cartService.addToCart(cartItem).subscribe(item => {
        this.cartService.updateCartCount(this.authService.getUser().id)
        console.log(`successfully added item: `, item)
        this.cartItemId = item.id
        this.isInCart = true
      })
      
  }

  // will check if a product is currently inside the user's cart
  checkIfInCart() {
    this.cartService.getCart(this.authService.getUser().id).subscribe(_cartItems => {
        _cartItems.forEach(item => {
          if (this.productInfo.id === item.product.id) {
            this.isInCart = true
            this.cartItemId = item.id
          }
        })
      })
  }

  // will update the quantity seen on the product
  updateQuantity(changeQuantityBy:number) {
    if (this.quantity+changeQuantityBy < 1) this.quantity = 1
    else this.quantity+=changeQuantityBy
  }

  // will remove the item from cart 
  removeFromCart() {
    
    if (this.cartItemId && this.cartItemId !== 0) {
      let cartItem:CartProduct = {
        id:this.cartItemId,
        quantity:0,
        user: {id: this.authService.getUser().id},
        product: this.productInfo
      }
      this.cartService.removeFromCart(cartItem).subscribe(res => {
        this.isInCart = false
        this.cartItemId = 0
        this.cartService.updateCartCount(this.authService.getUser().id)
      })
    }
  }

  ngOnDestroy() {
  }

  toProduct(id:number, allowed:boolean){
    if(allowed){
      this.router.navigateByUrl("/products/"+id)
    }
  }
}
