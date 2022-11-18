import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { MessagesService } from 'src/app/services/messages.service';

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

  error:string[]|undefined;
  errorPresent:boolean = false;

  featuredProducts:Product[] = [];
  

  constructor(private authService: AuthService,
              private router: Router,
              private errHandler:ErrorHandlerService,
              private msg:MessagesService) { }

  ngOnInit(): void {
    this.authService.getFeaturedProducts().subscribe(
      (products)=>this.featuredProducts=products
    )
    
  }
  
  onSubmit(): void {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      () => {
        this.authService.loggedIn=true;
      },
      (err) => {
        this.error = this.errHandler.handleError(err);
        this.errorPresent = true;
      },
      () => this.router.navigate(['home'])
    );
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
