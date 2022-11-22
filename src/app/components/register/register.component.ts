import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new UntypedFormGroup({
    fname: new UntypedFormControl(''),
    lname: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  })

  loggedInSubscription!:Subscription
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['home'])
      }
    })
  }
  
  onSubmit(): void {
    this.authService.register(this.registerForm.get('fname')?.value, this.registerForm.get('lname')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value, []).subscribe(
      () => console.log("New user registered"),
      (err) => console.log(err),
      () => this.router.navigate(['login'])
    );
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }

}
