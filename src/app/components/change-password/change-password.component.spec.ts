import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  // Mocking the authService
  let authServiceSpy : jasmine.SpyObj<AuthService>;
  
  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['changePassword', 'logout', 'handleLogout']);
    authServiceSpy.changePassword.and.returnValue(of());
    
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{path: 'login', component: BlankComponent}]
      )],
      declarations: [ LoginComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy}],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow user to change password', () => {
    const formData = {
      "email": "something@somewhere.com",
      "oldPassword": "8938ndisn@din",
      "newPassword": "newPas$w0rd"
    };
    component.changePasswordForm.setValue(formData);
    component.onChange();

    expect(authServiceSpy.changePassword).toHaveBeenCalledWith(formData.email, formData.oldPassword, formData.newPassword);
  });


  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});
