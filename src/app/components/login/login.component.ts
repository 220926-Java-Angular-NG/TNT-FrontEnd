import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  })

  featuredProducts:Product[] = [];
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
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
      (err) => console.log(err),
      () => this.router.navigate(['home'])
    );
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
