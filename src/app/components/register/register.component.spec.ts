import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { RegisterComponent } from './register.component';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn', 'register']);
    authServiceSpy.isLoggedIn.and.returnValue(of(false))
    
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        RouterTestingModule.withRoutes(
          [{path: 'login', component: BlankComponent}]
        )],
      declarations: [ RegisterComponent ],
      providers: [{provide:AuthService, useValue:authServiceSpy}],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get the form values', ()=>{
    expect(component.f.email.value).toBeFalsy();
  });

  it('should register a full user', ()=>{
    component.registerForm.controls.email.setValue('mhanson@gmail.com')
    component.registerForm.controls.fname.setValue('matt')
    component.registerForm.controls.lname.setValue('hanson')
    component.registerForm.controls.password.setValue('1234')
    let subObj = of(true);
    authServiceSpy.register.and.returnValue(subObj);
    

    fixture.detectChanges();
    let response:any = '';
     

    component.onSubmit()
    subObj.subscribe(()=>{})

    expect(component.registerFail).toBe(false)
  });


  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});
