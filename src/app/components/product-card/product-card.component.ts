import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartProduct } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

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

  // amount of items in the wish list
  wishListCount!: number;
  // the products in the wish list
  wishList?: Product[];
  
  
  cartItemId?:number
  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  featuredBanner = "../../assets/images/featured.png"

  isLoggedIn = this.authService.loggedIn;

  constructor(private cartService:CartService, private authService:AuthService, private router: Router) { }

  
  ngOnInit(): void {
    if (this.isLoggedIn) this.checkIfInCart();


    this.wishList = this.authService.getUser().wishList;

    if(this.wishList){
      this.wishListCount = this.wishList?.length;
    }else{
      this.wishList = [];
      this.wishListCount = 0;
    }


   //(this.wishList) ? this.wishListCount = this.wishList?.length : this.wishListCount = 0;
    
      
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
          if (item.product && this.productInfo.id === item.product.id) {
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

  isInWishList(product:Product): boolean {

    if (this.wishList){
      for(let wish of this.wishList) {
        if (wish.id === product.id){
          return true;
        }
      }
    }
    
    return false;

  }

  addToWishList(product : Product) : void {
    console.log(this.wishList)
    if (this.wishList) {
    this.wishList.push(product);
    this.updateWishList(this.wishList);
    }
  }

  updateWishList(wishList: Product[]) : void {
    let user1: User = this.authService.getUser();
      user1.wishList = wishList;
    
      this.authService.updateUser(user1).subscribe((user) => user1 = user);
      this.authService.setUser(user1);
    }

    

  removeFromWishList(product : Product) : void {
    console.log(product);
    if (this.wishList) {
      this.wishList = this.wishList.filter(item => item.id !== product.id)
        this.updateWishList(this.wishList);
      // for (let wish of this.wishList){

        // let index = this.wishList.findIndex(item => {
        //   return item.id === product.id
        // })

        // if (index)
        
        // if (wish.id === product.id){
        //   this.wishList = this.wishList.filter(w => w !== product);

        //   console.log(this.wishList);
        //   this.updateWishList(this.wishList);
        // }
      // }
    }
  }

  ngOnDestroy() {
  }

  toProduct(id:number, allowed:boolean){
    if(allowed){
      this.router.navigateByUrl("/products/"+id);
    }
  }
}
