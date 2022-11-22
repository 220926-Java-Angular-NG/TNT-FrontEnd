import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFail = false;

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required)
  })

  featuredProducts:Product[] = [];

  loggedInSubscription!:Subscription
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) this.router.navigate(['home'])
    })
    this.authService.getFeaturedProducts().subscribe(
      (products)=>this.featuredProducts=products
    )
  }
  
  onSubmit(): void {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      (currUser) => {
        // hide user
        currUser.password = ''
        this.authService.setUser(currUser)
        this.authService.loggedIn=true;
      },
      (err) => {
        this.loginFail = true;
      console.log(err);
      },
      () => this.router.navigate(['home'])
    );
  }

  

  register(): void {
    this.router.navigate(['register']);
  }

  
  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }

}
