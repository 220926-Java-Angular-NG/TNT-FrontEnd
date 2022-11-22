import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    fname: new UntypedFormControl(''),
    lname: new UntypedFormControl(''),
    email: new UntypedFormControl('', [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new UntypedFormControl('', [
      Validators.required
      // turning this validator off for ease of testing purposes
      // ,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')
    ])
  })

  loggedInSubscription!:Subscription
  error:string|undefined;
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['home'])
      }
    })
  }

  get f(){
    return this.registerForm.controls;
  }

  registerFail = false;
  
  onSubmit(): void {
    if(this.registerForm.valid){
    this.authService.register(this.registerForm.get('fname')?.value, this.registerForm.get('lname')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value)
    .subscribe(
      () => console.log("New user registered"),
      (err) => {console.log(err);
      this.registerFail = true},
      () => this.router.navigate(['login'])
    );
    }else{
      return;
    }
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }

}
