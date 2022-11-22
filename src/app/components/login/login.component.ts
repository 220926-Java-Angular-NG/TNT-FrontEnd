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
  responseType:any|undefined;
  

  constructor(private authService: AuthService,
              private router: Router,
              private respHandler:ResponseHandlerService,
              private msg:MessagesService) { }

  ngOnInit(): void {
    this.authService.getFeaturedProducts().subscribe(
      (products)=>this.featuredProducts=products
    )
    
  }
  
  onSubmit():void {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      () => {
        this.authService.loggedIn=true;
        this.respHandler.switchRespPresent();
        this.responseType = this.getResponseType('success');
        this.respHandler.handleSuccess("LOGIN SUCCESSFUL","You have successfully loged in.");
      },
      (err) => {
        this.respHandler.switchRespPresent();
        this.responseType = this.getResponseType('danger');
        this.respHandler.handleError(err);
      },
      () => {
        setTimeout(() => {
          this.respHandler.switchRespPresent();
          this.router.navigate(['home'])
        },3000)
        
        
      }
    );
  }

  register(): void {
    this.router.navigate(['register']);
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
