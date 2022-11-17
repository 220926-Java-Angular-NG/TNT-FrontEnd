import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  cartCount!: number;
  subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router, 
    private productService: ProductService,
    private cartService:CartService) { }
  
  ngOnInit(): void {
    // this.subscription = this.productService.getCart().subscribe(
    //   (cart) => this.cartCount = cart.cartCount
    // );
    this.cartService.updateCartCount(this.authService.getUser().id)

    this.subscription = this.cartService.getCartCount().subscribe(
      (cart) => this.cartCount = cart
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.authService.handleLogout()
      localStorage.clear()
    });
    this.router.navigate(['login']);
  }

}
