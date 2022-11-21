import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseHandlerService } from 'src/app/services/response-handler.service';
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

  

  featuredProducts:Product[] = [];
  

  constructor(private authService: AuthService,
              private router: Router,
              private respHandler:ResponseHandlerService,
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
        this.respHandler.switchRespPresent();
        this.respHandler.handleError(err);
      },
      () => this.router.navigate(['home'])
    );
  }

  register(): void {
    this.router.navigate(['register']);
  }

  getResponse():any{
    return this.respHandler.responseMsg;
  }

  logInFail():boolean{
    return this.respHandler.respPresent;
  }

  deleteResp():void{
    this.respHandler.responseMsg = [];
    this.respHandler.switchRespPresent();
  }

}
