import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/user';
import { CartProduct } from 'src/app/models/cart';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Product | undefined;
  allProducts:Product[]=[];
  lowThreshold:number = 5
  isLoggedIn?:boolean;
  isLoading:boolean = true;

  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  cartItemId?: number
  isInCart: boolean = false
  quantity: number = 1

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => this.allProducts = resp,
      (err) => console.log(err),
      () => console.log("Products Retrieved")
    );
    setTimeout(() => this.getProductInfo(), 500)
    // this.isLoggedIn=this.authService.loggedIn;

    this.authService.isLoggedIn().subscribe(res => {
      this.isLoggedIn = res
    })

    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  // will check if a product is currently inside the user's cart
  checkIfInCart() {
    this.cartService.getCart(this.authService.getUser().id).subscribe(_cartItems => {
      _cartItems.forEach(item => {
        if (this.product !== undefined) {
          if (item.product && this.product.id === item.product.id) {
            this.isInCart = true
            this.cartItemId = item.id
          }
        }
      })
    })
  }


  getProductInfo() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    for (let p of this.allProducts) {
      if (p.id == id) {
        this.product = p;
        this.checkIfInCart()
      }
    }
  }

  // will add an item to the cart
  addToCart(product: Product): void {
    let currUser: User = this.authService.getUser()
    let cartItem: CartProduct = {
      id: 0,
      quantity: this.quantity,
      product: product,
      user: currUser
    }
    this.cartService.addToCart(cartItem).subscribe(item => {
      this.cartService.updateCartCount(this.authService.getUser().id)
      console.log(`successfully added item: `, item)
      this.cartItemId = item.id
      this.isInCart = true
    })
  }

    // will remove the item from cart 
    removeFromCart() {
    
      if (this.cartItemId && this.cartItemId !== 0) {
        let cartItem:CartProduct = {
          id:this.cartItemId,
          quantity:0,
          user: {id: this.authService.getUser().id},
          product: this.product
        }
        this.cartService.removeFromCart(cartItem).subscribe(res => {
          this.isInCart = false
          this.cartItemId = 0
          this.cartService.updateCartCount(this.authService.getUser().id)
        })
      }
    }

    // will update the quantity seen on the product
    updateQuantity(changeQuantityBy:number) {
      let newQuan = this.quantity+changeQuantityBy

      // quantity by default has to be 1
      if ( newQuan < 1) this.quantity = 1
      else if (this.product !== undefined && newQuan > this.product.quantity) this.quantity = this.product.quantity
      else this.quantity = newQuan
    }

  loading(){
    setTimeout(()=>{this.setLoading},500)
  }

  setLoading(){
    this.isLoading=false;
  }
}
