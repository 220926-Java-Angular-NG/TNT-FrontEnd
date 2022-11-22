import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  featuredBanner = "../../assets/images/featured.png"

  @Input() productInfo!: Product;
  isLoggedIn = this.authService.loggedIn;

  constructor(private productService: ProductService, private authService:AuthService, private router:Router) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  addToCart(product: Product): void {

    let inCart = false;

    this.products.forEach(
      (element) => {
        if(element.product == product){
          ++element.quantity;
          let cart = {
            cartCount: this.cartCount + 1,
            products: this.products,
            totalPrice: this.totalPrice + product.price
          };
          this.productService.setCart(cart);
          inCart=true;
          return;
        };
      }
    );

    if(inCart == false){
      let newProduct = {
        product: product,
        quantity: 1
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + 1,
        products: this.products,
        totalPrice: this.totalPrice + product.price
      }
      this.productService.setCart(cart);
    }
      
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toProduct(id:number, allowed:boolean){
    if(allowed){
      this.router.navigateByUrl("/products/"+id);
    }
  }
}
