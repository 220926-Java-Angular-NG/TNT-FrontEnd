import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartProduct } from 'src/app/models/cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  finalProducts: {id: number, quantity: number}[] = []; 

  userCartProducts:CartProduct[] = []


  checkoutForm = new UntypedFormGroup({
    fname: new UntypedFormControl('', Validators.required),
    lname: new UntypedFormControl('', Validators.required),
    cardName: new UntypedFormControl('', Validators.required),
    detail: new UntypedFormControl('', Validators.required),
    addOne: new UntypedFormControl('', Validators.required),
    addTwo: new UntypedFormControl(''),
    city: new UntypedFormControl('', Validators.required),
    state: new UntypedFormControl('', Validators.required),
    zipCode: new UntypedFormControl('', Validators.required),
    country: new UntypedFormControl('', Validators.required)
  });

  constructor(private authservice:AuthService, private cartService:CartService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    // dep
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
      }
    );
    // end dep

    this.cartService.getCart(this.authservice.getUser().id).subscribe(cart => {
      this.totalPrice = 0
      this.userCartProducts = cart
      this.userCartProducts.forEach(cartItem => {
        if (cartItem.product)
          this.totalPrice += (cartItem.quantity * cartItem.product.price)
      })
      this.totalPrice = parseFloat(this.totalPrice.toFixed(2))
    })
  }

  onSubmit(): void {
    this.userCartProducts.forEach(
      (element) => {
        if (element.product) {
          const id = element.product.id;
          const quantity = element.quantity
          this.finalProducts.push({id, quantity})
        }
      } 
    );

    if(this.finalProducts.length > 0) {
      this.productService.purchase(this.finalProducts).subscribe(
        (resp) => console.log(resp),
        (err) => console.log(err),
        () => {

          this.cartService.clearUserCart(this.authservice.getUser()).subscribe(res => {
            console.log(res)
            this.router.navigate(['/home']);
          })
        } 
      );
    } else {
      this.router.navigate(['/home']);
    }
  }

}
