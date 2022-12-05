import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    oldPassword: new UntypedFormControl(''),
    newPassword: new UntypedFormControl
  })

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onChange():void{  
    this.auth.changePassword(this.changePasswordForm.get('email')?.value,
                             this.changePasswordForm.get('oldPassword')?.value,
                             this.changePasswordForm.get("newPassword")?.value)
                             .subscribe(
                              () => console.log("Password changed"),
                              (err) => console.log(err),
                              () => {
                                this.auth.logout()
                                this.auth.handleLogout()
                                this.router.navigate(['login']);

                              });
  }

}
