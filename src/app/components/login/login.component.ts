import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { ResponseHandlerService } from 'src/app/services/response-handler.service';
import { MessagesService } from 'src/app/services/messages.service';

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
  responseType:any|undefined;
  

  constructor(private authService: AuthService,
              private router: Router,
              private respHandler:ResponseHandlerService,
              private msg:MessagesService) { }

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) this.router.navigate(['home'])
    })
    this.authService.getFeaturedProducts().subscribe(
      (products)=>this.featuredProducts=products
    )
    
  }
  
  onSubmit():void {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      (currUser) => {
        // hide user
        currUser.password = ''
        this.authService.setUser(currUser)
        this.authService.loggedIn=true;
        if(this.respHandler.respPresent==false) this.respHandler.switchRespPresent();
        this.responseType = this.getResponseType('success');
        this.respHandler.handleSuccess("LOGIN SUCCESSFUL","You have successfully loged in.");
      },
      (err) => {

        if(this.respHandler.respPresent==false) this.respHandler.switchRespPresent();
        this.responseType = this.getResponseType('danger');
        this.respHandler.handleError(err);
      },
      () => {
        setTimeout(() => {
          if(this.respHandler.respPresent==true) this.respHandler.switchRespPresent();
          this.router.navigate(['home'])
        },3000)
        
        
      }
    );
  }

  

  register(): void {
    this.respHandler.switchRespPresent();
    this.router.navigate(['register']);
  }

  
  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }
  
  getResponse():any{
    return this.respHandler.responseMsg;
  }

  getResponseType(key:string):any{
    return this.respHandler.noticeTypes[key];
  }

  logInFail():boolean{
    return this.respHandler.respPresent;
  }

  deleteResp():void{
    this.respHandler.responseMsg = [];
    this.respHandler.switchRespPresent();
  }

}
