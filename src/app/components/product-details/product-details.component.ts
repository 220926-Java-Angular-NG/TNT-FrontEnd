import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';


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

  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => this.allProducts = resp,
      (err) => console.log(err),
      () => console.log("Products Retrieved")
    );
    setTimeout(()=>this.getProductInfo(),500)
    this.isLoggedIn=this.authService.loggedIn;

    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );
  }


  getProductInfo(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    for (let p of this.allProducts){
      if (p.id==id){
        this.product=p;
      }
    }
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
}
