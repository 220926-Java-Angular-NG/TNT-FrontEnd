import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
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
  cartCountSubscription!: Subscription;

  isLoggedIn = this.authService.loggedIn;
  loggedInSubscription!:Subscription;

  collapse:boolean = false

  userInfo?:User


  constructor(
    private authService: AuthService,
    private router: Router, 
    private productService: ProductService,
    private cartService:CartService) { }
  
  ngOnInit(): void {


    // update the amount of items in cart
    this.cartService.updateCartCount(this.authService.getUser().id)

    // get the new loggedIn status everytime it changes
    this.loggedInSubscription = this.authService.isLoggedIn().subscribe(status => {
      if (!this.isLoggedIn && status) {
        this.isLoggedIn = status;
        this.cartService.updateCartCount(this.authService.getUser().id);
        
      } else {
        this.isLoggedIn = status
      }
    })

    this.userInfo = this.authService.getUser()
    
    // this will attempt to make an 'Authorized' request to the backend
    // if this fails, then the user is not logged in
    // therefore log them out locally, and make them login again
    
    // TODO: Need this after JWT implementation
    // this.productService.getProducts().subscribe(
    //   (resp) => console.log('testing to see if the current login is useful'),
    //   (err) => {
    //     this.authService.logout().subscribe(msg => {
    //       this.authService.handleLogout()
    //       this.router.navigate(['login'])
    //     })
        
    //   },
    //   () => console.log("Products Retrieved")
    // );

    // get the new cartCount everytime it changes
    this.cartCountSubscription = this.cartService.getCartCount().subscribe(
      (cart) => this.cartCount = cart
    )

    
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
    this.cartCountSubscription.unsubscribe();
  }

  collapseToggle(newCollapse:boolean = !this.collapse) {
    this.collapse = newCollapse
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.authService.handleLogout()
      localStorage.clear()
      this.router.navigate(['login']);
    });
  }

}
